/**
 * Performance Monitoring Utility
 * Tracks Web Vitals and performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

export type PerformanceCallback = (metric: PerformanceMetric) => void;

/**
 * Web Vitals thresholds
 */
const WEB_VITALS_THRESHOLDS = {
  LCP: {good: 2500, poor: 4000}, // Largest Contentful Paint
  FID: {good: 100, poor: 300}, // First Input Delay
  CLS: {good: 0.1, poor: 0.25}, // Cumulative Layout Shift
  FCP: {good: 1800, poor: 3000}, // First Contentful Paint
  TTFB: {good: 800, poor: 1800}, // Time to First Byte
} as const;

/**
 * Get performance rating based on threshold
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!threshold) {
    return 'good';
  }

  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Report Web Vitals (if web-vitals library is available)
 */
export function reportWebVitals(onPerfEntry?: PerformanceCallback): void {
  if (typeof window === 'undefined' || !onPerfEntry) {
    return;
  }

  // TODO: Install and use web-vitals library
  // Example:
  // import {onCLS, onFID, onFCP, onLCP, onTTFB} from 'web-vitals';
  // onCLS(onPerfEntry);
  // onFID(onPerfEntry);
  // onFCP(onPerfEntry);
  // onLCP(onPerfEntry);
  // onTTFB(onPerfEntry);
}

/**
 * Measure function execution time
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T,
  callback?: (duration: number) => void
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  callback?.(duration);
  return result;
}

/**
 * Measure async function execution time
 */
export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>,
  callback?: (duration: number) => void
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  callback?.(duration);
  return result;
}

/**
 * Create performance mark
 */
export function mark(name: string): void {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure between two marks
 */
export function measure(measureName: string, startMark: string, endMark?: string): PerformanceEntry | null {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(measureName, startMark, endMark);
      const entries = performance.getEntriesByName(measureName);
      return entries[entries.length - 1] || null;
    } catch (error) {
      console.warn(`[Performance] Failed to measure ${measureName}:`, error);
      return null;
    }
  }
  return null;
}

/**
 * Get all performance entries
 */
export function getPerformanceEntries(): PerformanceEntry[] {
  if (typeof performance !== 'undefined' && performance.getEntries) {
    return performance.getEntries();
  }
  return [];
}

/**
 * Clear performance entries
 */
export function clearPerformanceEntries(): void {
  if (typeof performance !== 'undefined' && performance.clearMarks && performance.clearMeasures) {
    performance.clearMarks();
    performance.clearMeasures();
  }
}

/**
 * Track bundle size (for development)
 */
export function trackBundleSize(): void {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;

    scripts.forEach((script) => {
      const src = (script as HTMLScriptElement).src;
      if (src) {
        // This is a simplified check - actual size would need to be fetched
        console.log(`[Performance] Script loaded: ${src}`);
      }
    });

    if (totalSize > 0) {
      console.log(`[Performance] Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
    }
  }
}


