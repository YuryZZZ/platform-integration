import React from 'react';
import './Stepper.css';

export interface Step {
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({ steps, activeStep, orientation = 'horizontal' }: StepperProps) {
  return (
    <div className={`stepper stepper--${orientation}`}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`stepper__step ${
            index < activeStep ? 'stepper__step--completed' : ''
          } ${index === activeStep ? 'stepper__step--active' : ''}`}
        >
          <div className="stepper__indicator">
            {index < activeStep ? '✓' : index + 1}
          </div>
          <div className="stepper__content">
            <div className="stepper__title">{step.title}</div>
            {step.description && (
              <div className="stepper__description">{step.description}</div>
            )}
          </div>
          {index < steps.length - 1 && <div className="stepper__connector" />}
        </div>
      ))}
    </div>
  );
}
