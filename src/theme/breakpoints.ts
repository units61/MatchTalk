/**
 * Breakpoint System
 * Defines responsive breakpoints for the application
 */

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Media query strings for use in CSS
 */
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
} as const;

/**
 * Max-width media queries
 */
export const maxMediaQueries = {
  xs: `(max-width: ${breakpoints.sm - 1}px)`,
  sm: `(max-width: ${breakpoints.md - 1}px)`,
  md: `(max-width: ${breakpoints.lg - 1}px)`,
  lg: `(max-width: ${breakpoints.xl - 1}px)`,
  xl: `(max-width: ${breakpoints['2xl'] - 1}px)`,
} as const;

/**
 * Check if current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return 'md';
  }

  const width = window.innerWidth;

  if (width >= breakpoints['2xl']) {
    return '2xl';
  } else if (width >= breakpoints.xl) {
    return 'xl';
  } else if (width >= breakpoints.lg) {
    return 'lg';
  } else if (width >= breakpoints.md) {
    return 'md';
  } else if (width >= breakpoints.sm) {
    return 'sm';
  } else {
    return 'xs';
  }
}

/**
 * Check if viewport is mobile
 */
export function isMobile(): boolean {
  return !matchesBreakpoint('md');
}

/**
 * Check if viewport is tablet
 */
export function isTablet(): boolean {
  return matchesBreakpoint('md') && !matchesBreakpoint('lg');
}

/**
 * Check if viewport is desktop
 */
export function isDesktop(): boolean {
  return matchesBreakpoint('lg');
}


