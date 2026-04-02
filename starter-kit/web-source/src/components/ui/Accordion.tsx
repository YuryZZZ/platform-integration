import React, { useState, useContext, createContext, useCallback, useId } from 'react';

interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
}

interface AccordionProps {
  allowMultiple?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ allowMultiple = false, children, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  }, [allowMultiple]);

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`accordion ${className || ''}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export function AccordionItem({ title, children, defaultOpen = false, id }: AccordionItemProps) {
  const generatedId = useId();
  const itemId = id || generatedId;
  const { openItems, toggleItem } = useAccordionContext();
  
  // Initialize open state on mount if defaultOpen
  const [initialized, setInitialized] = useState(false);
  
  React.useEffect(() => {
    if (!initialized && defaultOpen) {
      toggleItem(itemId);
      setInitialized(true);
    }
  }, [initialized, defaultOpen, itemId, toggleItem]);

  const isOpen = openItems.has(itemId);

  return (
    <div className="accordion__item" data-open={isOpen}>
      <button 
        className="accordion__header" 
        onClick={() => toggleItem(itemId)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${itemId}`}
        type="button"
      >
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon" aria-hidden="true">
          {isOpen ? '\u2212' : '+'}
        </span>
      </button>
      <div 
        id={`accordion-content-${itemId}`}
        className="accordion__content"
        hidden={!isOpen}
      >
        {isOpen && children}
      </div>
    </div>
  );
}
