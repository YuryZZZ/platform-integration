import React from 'react';
import './List.css';

interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ListProps {
  children: React.ReactNode;
  dense?: boolean;
  bordered?: boolean;
}

export function List({ children, dense, bordered }: ListProps) {
  return (
    <ul className={`list ${dense ? 'list--dense' : ''} ${bordered ? 'list--bordered' : ''}`.trim()}>
      {children}
    </ul>
  );
}

export function ListItem({ children, onClick, selected, disabled, icon }: ListItemProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <li
      className={`list__item ${selected ? 'list__item--selected' : ''} ${disabled ? 'list__item--disabled' : ''}`.trim()}
      onClick={handleClick}
      aria-selected={selected}
      aria-disabled={disabled}
    >
      {icon && <span className="list__icon">{icon}</span>}
      <span className="list__content">{children}</span>
    </li>
  );
}
