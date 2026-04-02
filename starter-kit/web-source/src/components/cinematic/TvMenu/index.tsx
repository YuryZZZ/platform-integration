import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useSpatialNav } from '@/hooks/useSpatialNav';
import './TvMenu.css';

export type TvMenuOrientation = 'vertical' | 'horizontal';
export type TvMenuVariant = 'default' | 'pills' | 'tabs' | 'sidebar';
export type TvMenuSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TvMenuItemProps {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  shortcut?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface TvMenuProps {
  id?: string;
  orientation?: TvMenuOrientation;
  variant?: TvMenuVariant;
  size?: TvMenuSize;
  children: ReactNode;
  className?: string;
  onSelect?: (itemId: string) => void;
  defaultActiveId?: string;
}

export interface TvMenuRef {
  focus: () => void;
  focusFirst: () => void;
  focusLast: () => void;
  focusById: (id: string) => void;
}

interface TvMenuContextType {
  activeId: string | null;
  setActiveId: (id: string) => void;
  orientation: TvMenuOrientation;
  variant: TvMenuVariant;
  size: TvMenuSize;
  onSelect?: (itemId: string) => void;
}

const TvMenuContext = createContext<TvMenuContextType | undefined>(undefined);

const useTvMenu = () => {
  const context = useContext(TvMenuContext);
  if (!context) {
    throw new Error('useTvMenu must be used within a TvMenu');
  }
  return context;
};

export const TvMenu = forwardRef<TvMenuRef, TvMenuProps>(
  (
    {
      id,
      orientation = 'vertical',
      variant = 'default',
      size = 'md',
      children,
      className = '',
      onSelect,
      defaultActiveId,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveIdState] = useState<string | null>(defaultActiveId || null);
    
    const setActiveId = useCallback(
      (id: string) => {
        setActiveIdState(id);
        if (onSelect) {
          onSelect(id);
        }
      },
      [onSelect]
    );

    const { focusedId, registerElement, deregisterElement } = useSpatialNav({
      onSelect: setActiveId,
    });

    // Sync focusedId with activeId
    useEffect(() => {
      if (focusedId && focusedId !== activeId) {
        setActiveIdState(focusedId);
      }
    }, [focusedId, activeId]);

    // Register menu items on mount
    useEffect(() => {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('[data-tv-menu-item]');
        items.forEach((item) => {
          const itemId = item.getAttribute('data-item-id');
          if (itemId && item instanceof HTMLElement) {
            registerElement(itemId, item);
          }
        });
      }
      return () => {
        // Cleanup
        if (containerRef.current) {
          const items = containerRef.current.querySelectorAll('[data-tv-menu-item]');
          items.forEach((item) => {
            const itemId = item.getAttribute('data-item-id');
            if (itemId) {
              deregisterElement(itemId);
            }
          });
        }
      };
    }, [children, registerElement, deregisterElement]);

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (containerRef.current) {
          containerRef.current.focus();
        }
      },
      focusFirst: () => {
        const firstItem = containerRef.current?.querySelector('[data-tv-menu-item]');
        if (firstItem instanceof HTMLElement) {
          firstItem.focus();
          const itemId = firstItem.getAttribute('data-item-id');
          if (itemId) {
            setActiveId(itemId);
          }
        }
      },
      focusLast: () => {
        const items = containerRef.current?.querySelectorAll('[data-tv-menu-item]');
        if (items && items.length > 0) {
          const lastItem = items[items.length - 1];
          if (lastItem instanceof HTMLElement) {
            lastItem.focus();
            const itemId = lastItem.getAttribute('data-item-id');
            if (itemId) {
              setActiveId(itemId);
            }
          }
        }
      },
      focusById: (id: string) => {
        const item = containerRef.current?.querySelector(`[data-item-id="${id}"]`);
        if (item instanceof HTMLElement) {
          item.focus();
          setActiveId(id);
        }
      },
    }));

    const contextValue: TvMenuContextType = {
      activeId,
      setActiveId,
      orientation,
      variant,
      size,
      onSelect,
    };

    const menuClasses = [
      'tv-menu',
      `tv-menu--${orientation}`,
      `tv-menu--${variant}`,
      `tv-menu--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TvMenuContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          id={id}
          className={menuClasses}
          tabIndex={0}
          role="menu"
          aria-orientation={orientation}
        >
          {children}
        </div>
      </TvMenuContext.Provider>
    );
  }
);

TvMenu.displayName = 'TvMenu';

export const TvMenuItem: React.FC<TvMenuItemProps> = ({
  id,
  label,
  icon,
  disabled = false,
  shortcut,
  children,
  className = '',
  onClick,
}) => {
  const { activeId, setActiveId, orientation, variant, size } = useTvMenu();
  const itemRef = useRef<HTMLDivElement>(null);

  const isActive = activeId === id;
  const isFocused = isActive;

  const itemClasses = [
    'tv-menu-item',
    `tv-menu-item--${orientation}`,
    `tv-menu-item--${variant}`,
    `tv-menu-item--${size}`,
    isActive ? 'tv-menu-item--active' : '',
    isFocused ? 'tv-menu-item--focused' : '',
    disabled ? 'tv-menu-item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (disabled) return;
    setActiveId(id);
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(id);
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div
      ref={itemRef}
      data-tv-menu-item
      data-item-id={id}
      className={itemClasses}
      role="menuitem"
      tabIndex={disabled ? -1 : isFocused ? 0 : -1}
      aria-disabled={disabled}
      aria-label={label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && <span className="tv-menu-item__icon">{icon}</span>}
      <span className="tv-menu-item__label">{label}</span>
      {shortcut && <span className="tv-menu-item__shortcut">{shortcut}</span>}
      {children && <div className="tv-menu-item__content">{children}</div>}
    </div>
  );
};

export default TvMenu;
