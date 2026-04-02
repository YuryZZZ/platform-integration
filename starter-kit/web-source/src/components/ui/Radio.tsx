import React, { createContext, useContext, useState, useEffect } from 'react';
import './Radio.css';

export interface RadioProps {
  /** Value of the radio button */
  value: string;
  /** Whether the radio is checked (controlled) */
  checked?: boolean;
  /** Callback when radio selection changes */
  onChange?: (value: string) => void;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Label text for the radio */
  label?: string;
  /** Name attribute for the radio group */
  name: string;
  /** Additional CSS class */
  className?: string;
}

export interface RadioGroupProps {
  /** Name of the radio group */
  name: string;
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Radio button children */
  children: React.ReactNode;
  /** Label for the entire group */
  label?: string;
  /** Additional CSS class */
  className?: string;
}

interface RadioGroupContextType {
  name: string;
  selectedValue: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

/**
 * RadioGroup component for grouping related radio buttons
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  label,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  
  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  const contextValue: RadioGroupContextType = {
    name,
    selectedValue,
    onChange: handleChange,
  };
  
  return (
    <div 
      className={`radio-group ${className}`}
      role="radiogroup"
      aria-label={label}
    >
      {label && (
        <div className="radio-group-label" id={`radio-group-label-${name}`}>
          {label}
        </div>
      )}
      <RadioGroupContext.Provider value={contextValue}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

/**
 * Individual radio button component
 */
const Radio: React.FC<RadioProps> = ({
  value,
  checked: controlledChecked,
  onChange,
  disabled = false,
  label,
  name,
  className = '',
}) => {
  const groupContext = useContext(RadioGroupContext);
  const [internalChecked, setInternalChecked] = useState(false);
  
  const isInGroup = !!groupContext;
  const isControlled = controlledChecked !== undefined;
  
  let checked = false;
  let actualName = name;
  let handleChange: (value: string) => void;
  
  if (isInGroup && groupContext) {
    checked = groupContext.selectedValue === value;
    actualName = groupContext.name;
    handleChange = groupContext.onChange;
  } else {
    checked = isControlled ? controlledChecked : internalChecked;
    actualName = name;
    handleChange = (val: string) => {
      if (!isControlled) {
        setInternalChecked(true);
      }
      if (onChange) {
        onChange(val);
      }
    };
  }
  
  const radioId = actualName ? `radio-${actualName}-${value}` : `radio-${value}`;
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      handleChange(value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    // Arrow keys navigate between radio buttons in a group
    if (isInGroup && (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight')) {
      e.preventDefault();
    }
    
    // Space or Enter key selects the radio
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      if (!checked) {
        handleChange(value);
      }
    }
  };
  
  return (
    <div className={`radio-wrapper ${className}`}>
      <div className={`radio-input ${disabled ? 'radio--disabled' : ''} ${checked ? 'radio--checked' : ''}`}>
        <input
          type="radio"
          id={radioId}
          name={actualName}
          value={value}
          checked={checked}
          onChange={handleRadioChange}
          disabled={disabled}
          className="radio-native"
          aria-checked={checked}
          aria-label={label || `Radio option ${value}`}
          onKeyDown={handleKeyDown}
        />
        <div 
          className="radio-circle"
          role="presentation"
          tabIndex={-1}
        >
          {checked && (
            <div className="radio-dot" />
          )}
        </div>
      </div>
      {label && (
        <label 
          htmlFor={radioId}
          className={`radio-label ${disabled ? 'radio--disabled' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
