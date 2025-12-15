/**
 * Accessibility Utilities
 * Provides helper functions for accessibility features
 */

/**
 * Generate accessible label for screen readers
 */
export function getAccessibleLabel(
  action: string,
  context?: string,
  count?: number
): string {
  let label = action;
  
  if (context) {
    label = `${action} ${context}`;
  }
  
  if (count !== undefined) {
    label = `${label} (${count} ${count === 1 ? 'item' : 'items'})`;
  }
  
  return label;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') {
    return;
  }

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Get keyboard shortcut description
 */
export function getKeyboardShortcut(key: string, action: string): string {
  return `${action} (${key})`;
}

/**
 * Focus management utilities
 */
export function focusElement(selector: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const element = document.querySelector(selector) as HTMLElement;
  if (element && typeof element.focus === 'function') {
    element.focus();
  }
}

export function trapFocus(container: HTMLElement): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    rect.width > 0 &&
    rect.height > 0 &&
    element.getAttribute('aria-hidden') !== 'true'
  );
}

/**
 * Get accessible name for element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label first
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) {
    return ariaLabel;
  }

  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) {
      return labelElement.textContent || '';
    }
  }

  // Check for associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) {
      return label.textContent || '';
    }
  }

  // Fallback to text content
  return element.textContent || element.getAttribute('alt') || '';
}

