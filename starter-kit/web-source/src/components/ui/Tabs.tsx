import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ReactNode,
  HTMLAttributes,
  MouseEvent,
} from 'react';
import './Tabs.css';

interface TabsContextType {
  selectedValue: string;
  onValueChange: (value: string) => void;
  registerTab: (value: string, element: HTMLElement) => void;
  unregisterTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs container');
  }
  return context;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
}: TabsProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    value || defaultValue || ''
  );
  const tabElements = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTab = (tabValue: string, element: HTMLElement) => {
    tabElements.current.set(tabValue, element);
  };

  const unregisterTab = (tabValue: string) => {
    tabElements.current.delete(tabValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(tabElements.current.keys());
    if (tabs.length === 0) return;

    const currentIndex = tabs.indexOf(selectedValue);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleValueChange(selectedValue);
        return;
      default:
        return;
    }

    const newValue = tabs[newIndex];
    handleValueChange(newValue);
    tabElements.current.get(newValue)?.focus();
  };

  const contextValue: TabsContextType = {
    selectedValue,
    onValueChange: handleValueChange,
    registerTab,
    unregisterTab,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`tabs ${className}`}
        onKeyDown={handleKeyDown}
        role="tablist"
        aria-orientation="horizontal"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '', ...props }: TabsListProps) {
  return (
    <div className={`tabs-list ${className}`} role="tablist" {...props}>
      {children}
    </div>
  );
}

export function Tab({
  value,
  children,
  disabled = false,
  className = '',
  onClick,
  ...props
}: TabProps) {
  const { selectedValue, onValueChange, registerTab, unregisterTab } =
    useTabsContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isSelected = selectedValue === value;

  useEffect(() => {
    if (buttonRef.current && !disabled) {
      registerTab(value, buttonRef.current);
    }
    return () => unregisterTab(value);
  }, [value, disabled, registerTab, unregisterTab]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
    onValueChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onValueChange(value);
    }
  };

  return (
    <button
      ref={buttonRef}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      className={`tab ${isSelected ? 'tab--selected' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  value,
  children,
  className = '',
  ...props
}: TabPanelProps) {
  const { selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={`tab-panel ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
