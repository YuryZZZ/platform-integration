import { useState, useEffect } from 'react';
import './Switch.css';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  name?: string;
}

export function Switch({ 
  checked = false, 
  onChange, 
  disabled = false, 
  size = 'md', 
  label, 
  name 
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);
  
  // Sync internal state with external checked prop
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  
  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };
  
  return (
    <label 
      className={`switch switch--${size} ${disabled ? 'switch--disabled' : ''} ${isChecked ? 'switch--checked' : ''}`}
      aria-disabled={disabled}
    >
      <input
        type="checkbox"
        className="switch__input"
        checked={isChecked}
        onChange={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        name={name}
        role="switch"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
      />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}
