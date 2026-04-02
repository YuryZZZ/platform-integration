import { useState, useRef } from 'react';
import './FileInput.css';

export interface FileInputProps {
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  dragLabel?: string;
}

export function FileInput({ 
  onChange, 
  accept, 
  multiple, 
  disabled, 
  label = 'Choose file', 
  dragLabel = 'or drag and drop' 
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onChange?.(e.dataTransfer.files);
  };

  return (
    <div
      className={`file-input ${isDragging ? 'file-input--dragging' : ''} ${disabled ? 'file-input--disabled' : ''}`}
      onDragOver={(e) => { 
        e.preventDefault(); 
        setIsDragging(true); 
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input 
        ref={inputRef} 
        type="file" 
        accept={accept} 
        multiple={multiple} 
        disabled={disabled} 
        onChange={(e) => onChange?.(e.target.files)} 
        className="file-input__input" 
      />
      <button 
        type="button" 
        className="file-input__button" 
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        {label}
      </button>
      <span className="file-input__drag-label">{dragLabel}</span>
    </div>
  );
}
