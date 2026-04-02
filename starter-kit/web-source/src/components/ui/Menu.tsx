import React from 'react';
import './Menu.css';

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface MenuProps {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  return <nav className="menu">{children}</nav>;
}

export function MenuItem({ label, icon, disabled, onClick }: MenuItemProps) {
  return (
    <button
      className={`menu__item ${disabled ? 'menu__item--disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="menu__icon">{icon}</span>}
      <span className="menu__label">{label}</span>
    </button>
  );
}
