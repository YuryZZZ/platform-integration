import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import './TvList.css';

// Types
export interface TvListItem {
  id: string;
  [key: string]: any;
}

export interface TvListProps<T extends TvListItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  itemSize?: number;
  overscan?: number;
  onFocusChange?: (item: T, index: number) => void;
  onSelect?: (item: T, index: number) => void;
  className?: string;
  listClassName?: string;
  gap?: number;
  initialFocusIndex?: number;
}

export interface TvListRef {
  scrollToItem: (index: number, align?: 'start' | 'center' | 'end') => void;
  focusItem: (index: number) => void;
  getFocusedIndex: () => number;
  getVisibleRange: () => { start: number; end: number };
}

const DEFAULT_ITEM_SIZE = 80;
const DEFAULT_OVERSCAN = 3;
const DEFAULT_GAP = 8;

function TvListInner<T extends TvListItem>(
  props: TvListProps<T>,
  ref: React.ForwardedRef<TvListRef>
) {
  const {
    items,
    renderItem,
    orientation = 'vertical',
    itemSize = DEFAULT_ITEM_SIZE,
    overscan = DEFAULT_OVERSCAN,
    onFocusChange,
    onSelect,
    className,
    listClassName,
    gap = DEFAULT_GAP,
    initialFocusIndex = 0,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(initialFocusIndex);
  const [containerSize, setContainerSize] = useState(0);
  const focusedItemRef = useRef<HTMLDivElement>(null);

  const isVertical = orientation === 'vertical';
  const totalSize = items.length * (itemSize + gap) - gap;

  // Measure container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize(isVertical ? entry.contentRect.height : entry.contentRect.width);
      }
    });

    observer.observe(container);
    setContainerSize(isVertical ? container.clientHeight : container.clientWidth);

    return () => observer.disconnect();
  }, [isVertical]);

  // Calculate visible range with overscan
  const visibleRange = useMemo(() => {
    const startOffset = Math.max(0, Math.floor(scrollTop / (itemSize + gap)) - overscan);
    const visibleCount = Math.ceil(containerSize / (itemSize + gap)) + overscan * 2;
    const endOffset = Math.min(items.length - 1, startOffset + visibleCount);

    return { start: startOffset, end: endOffset };
  }, [scrollTop, containerSize, itemSize, gap, overscan, items.length]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(isVertical ? target.scrollTop : target.scrollLeft);
  }, [isVertical]);

  // Focus management
  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
    onFocusChange?.(items[index], index);
  }, [items, onFocusChange]);

  // Selection
  const handleSelect = useCallback((index: number) => {
    onSelect?.(items[index], index);
  }, [items, onSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const nextIndex = isVertical
      ? (prev: number) => Math.min(items.length - 1, prev + 1)
      : (prev: number) => Math.min(items.length - 1, prev + 1);
    const prevIndex = isVertical
      ? (prev: number) => Math.max(0, prev - 1)
      : (prev: number) => Math.max(0, prev - 1);

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if ((isVertical && e.key === 'ArrowDown') || (!isVertical && e.key === 'ArrowRight')) {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = nextIndex(prev);
            onFocusChange?.(items[next], next);
            scrollToItemInternal(next);
            return next;
          });
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if ((isVertical && e.key === 'ArrowUp') || (!isVertical && e.key === 'ArrowLeft')) {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prevIndex(prev);
            onFocusChange?.(items[next], next);
            scrollToItemInternal(next);
            return next;
          });
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect(focusedIndex);
        break;
    }
  }, [isVertical, items, onFocusChange, focusedIndex, handleSelect]);

  // Internal scroll to item
  const scrollToItemInternal = useCallback((index: number, align: 'start' | 'center' | 'end' = 'center') => {
    const container = containerRef.current;
    if (!container) return;

    const itemOffset = index * (itemSize + gap);
    let scrollTarget: number;

    switch (align) {
      case 'start':
        scrollTarget = itemOffset;
        break;
      case 'end':
        scrollTarget = itemOffset - containerSize + itemSize;
        break;
      case 'center':
      default:
        scrollTarget = itemOffset - (containerSize - itemSize) / 2;
        break;
    }

    scrollTarget = Math.max(0, Math.min(scrollTarget, totalSize - containerSize));

    if (isVertical) {
      container.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    } else {
      container.scrollTo({
        left: scrollTarget,
        behavior: 'smooth',
      });
    }
  }, [itemSize, gap, containerSize, totalSize, isVertical]);

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    scrollToItem: (index: number, align: 'start' | 'center' | 'end' = 'center') => {
      scrollToItemInternal(index, align);
    },
    focusItem: (index: number) => {
      if (index >= 0 && index < items.length) {
        setFocusedIndex(index);
        onFocusChange?.(items[index], index);
        scrollToItemInternal(index);
      }
    },
    getFocusedIndex: () => focusedIndex,
    getVisibleRange: () => visibleRange,
  }), [scrollToItemInternal, items, onFocusChange, focusedIndex, visibleRange]);

  // Focus restoration: ensure focused item stays visible after scroll
  useEffect(() => {
    const focusedOffset = focusedIndex * (itemSize + gap);
    const scrollEnd = scrollTop + containerSize;

    // If focused item is out of view, don't auto-scroll (user is scrolling manually)
    // Only auto-scroll when focus changes via keyboard
  }, [focusedIndex, itemSize, gap, scrollTop, containerSize]);

  // Generate visible items
  const visibleItems = useMemo(() => {
    const result: React.ReactNode[] = [];
    
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      if (i < 0 || i >= items.length) continue;
      
      const item = items[i];
      const offset = i * (itemSize + gap);
      const isFocused = i === focusedIndex;

      result.push(
        <div
          key={item.id}
          ref={isFocused ? focusedItemRef : null}
          className={`tv-list__item ${isFocused ? 'tv-list__item--focused' : ''}`}
          style={{
            position: 'absolute',
            [isVertical ? 'top' : 'left']: offset,
            [isVertical ? 'height' : 'width']: itemSize,
            [isVertical ? 'width' : 'height']: '100%',
          }}
          onFocus={() => handleFocus(i)}
          onClick={() => {
            handleFocus(i);
            handleSelect(i);
          }}
          tabIndex={isFocused ? 0 : -1}
          role="listitem"
          aria-selected={isFocused}
        >
          {renderItem(item, i)}
        </div>
      );
    }

    return result;
  }, [visibleRange, items, focusedIndex, itemSize, gap, isVertical, renderItem, handleFocus, handleSelect]);

  return (
    <div
      ref={containerRef}
      className={`tv-list-container ${className || ''}`}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      style={{
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div
        ref={listRef}
        className={`tv-list tv-list--${orientation} ${listClassName || ''}`}
        role="list"
        style={{
          position: 'relative',
          [isVertical ? 'height' : 'width']: totalSize,
          [isVertical ? 'width' : 'height']: '100%',
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
}

export const TvList = forwardRef(TvListInner) as <T extends TvListItem>(
  props: TvListProps<T> & { ref?: React.ForwardedRef<TvListRef> }
) => React.ReactElement;

export default TvList;
