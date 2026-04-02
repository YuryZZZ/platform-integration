import { useState, useRef, useEffect, useCallback, ReactNode, createContext, useContext } from 'react';
import './DropdownMenu.css';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="dropdown-menu">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
  const { open, setOpen } = useContext(DropdownContext)!;
  return (
    <div onClick={() => setOpen(!open)} className="dropdown-menu__trigger">
      {children}
    </div>
  );
}

export function DropdownMenuContent({ children }: { children: ReactNode }) {
  const { open } = useContext(DropdownContext)!;
  if (!open) return null;
  return <div className="dropdown-menu__content">{children}</div>;
}

export function DropdownMenuItem({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  const { setOpen } = useContext(DropdownContext)!;
  return (
    <button className="dropdown-menu__item" disabled={disabled} onClick={() => { onClick?.(); setOpen(false); }}>
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div className="dropdown-menu__separator" />;
}
