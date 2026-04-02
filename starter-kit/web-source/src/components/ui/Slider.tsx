import { useState } from 'react';
import './Slider.css';

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
}

export function Slider({ 
  value = 0, 
  min = 0, 
  max = 100, 
  step = 1, 
  onChange, 
  disabled, 
  showValue, 
  label 
}: SliderProps) {
  const [currentValue, setCurrentValue] = useState(value);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };
  
  const percentage = ((currentValue - min) / (max - min)) * 100;
  
  return (
    <div className={`slider ${disabled ? 'slider--disabled' : ''}`}>
      {label && <label className="slider__label">{label}</label>}
      <div className="slider__track">
        <div className="slider__fill" style={{ width: `${percentage}%` }} />
        <input
          type="range"
          className="slider__input"
          value={currentValue}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {showValue && <span className="slider__value">{currentValue}</span>}
    </div>
  );
}
