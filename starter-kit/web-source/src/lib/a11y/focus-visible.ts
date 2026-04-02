/**
 * Focus Visible Polyfill
 * Provides consistent focus styles for keyboard navigation
 */

let hadKeyboardEvent = false;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout: ReturnType<typeof setTimeout>;

const inputTypesWhitelist: Record<string, boolean> = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true,
};

function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Tab' || e.keyCode === 9) {
    hadKeyboardEvent = true;
  }
}

function handleMouseDown(): void {
  hadKeyboardEvent = false;
}

function handlePointerDown(e: PointerEvent): void {
  if (e.pointerType === 'mouse') {
    hadKeyboardEvent = false;
  }
}

function handleTouchStart(): void {
  hadKeyboardEvent = false;
}

function handleFocus(e: FocusEvent): void {
  const target = e.target as HTMLElement;
  if (hadKeyboardEvent || shouldShowFocus(target)) {
    target.classList.add('focus-visible');
  }
}

function handleBlur(e: FocusEvent): void {
  const target = e.target as HTMLElement;
  if (target.classList.contains('focus-visible')) {
    target.classList.remove('focus-visible');
    hadFocusVisibleRecently = true;
    clearTimeout(hadFocusVisibleRecentlyTimeout);
    hadFocusVisibleRecentlyTimeout = setTimeout(() => {
      hadFocusVisibleRecently = false;
    }, 100);
  }
}

function handleVisibilityChange(): void {
  if (document.visibilityState === 'hidden' && hadFocusVisibleRecently) {
    hadKeyboardEvent = true;
  }
}

function shouldShowFocus(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  if (element.hasAttribute('contenteditable')) {
    return true;
  }
  if (tagName === 'input') {
    const type = (element as HTMLInputElement).type;
    return inputTypesWhitelist[type] || false;
  }
  if (tagName === 'textarea' || tagName === 'select') {
    return true;
  }
  return false;
}

export function focusVisiblePolyfill(): void {
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('touchstart', handleTouchStart, true);
  document.addEventListener('focus', handleFocus, true);
  document.addEventListener('blur', handleBlur, true);
  document.addEventListener('visibilitychange', handleVisibilityChange, true);
}

export function initFocusVisible(): void {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    focusVisiblePolyfill();
  }
}

export function isFocusVisible(): boolean {
  return hadKeyboardEvent;
}
