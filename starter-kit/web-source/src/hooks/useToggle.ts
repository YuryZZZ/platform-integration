import { useState, useCallback } from 'react';

/**
 * Toggle hook for boolean state management.
 * Returns the current boolean value and a function to toggle it.
 * 
 * @param initial - The initial boolean value (default: false)
 * @returns A tuple of [currentValue, toggleFunction]
 * 
 * @example
 * const [isOpen, toggleOpen] = useToggle(false);
 * 
 * return (
 *   <>
 *     <button onClick={toggleOpen}>Toggle</button>
 *     {isOpen && <Modal />}
 *   </>
 * );
 */
export function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}

export default useToggle;
