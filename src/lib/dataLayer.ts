'use client';

/**
 * MSK Institute — Production DataLayer & Telemetry Architecture
 *
 * Implements a privacy-first, zero-cost Google Tag Manager (GTM) and
 * Google Analytics 4 (GA4) dataLayer standard.
 *
 * PRIVACY GUARANTEES:
 * - Strictly strips all Personally Identifiable Information (PII)
 *   (e.g., student full names, phone numbers, email addresses, WhatsApp messages, passwords).
 * - Sanitizes all payload parameters prior to pushing to window.dataLayer.
 * - Standard snake_case event conventions for GA4 / GTM triggers.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (command: string, ...args: any[]) => void;
  }
}

// Disallowed PII keys in analytics payloads
const PII_KEYS = new Set([
  'name',
  'fullname',
  'full_name',
  'student_name',
  'phone',
  'mobile',
  'telephone',
  'phone_number',
  'mobile_number',
  'email',
  'email_address',
  'password',
  'query',
  'message',
  'whatsapp_message',
  'applicant_statement',
  'note',
  'card',
  'upi',
  'token',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/;

/**
 * Recursively sanitize parameters to eliminate PII.
 */
export function sanitizeAnalyticsParams(params: Record<string, any> = {}): Record<string, any> {
  const clean: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();

    // Skip disallowed PII keys
    if (PII_KEYS.has(lowerKey)) {
      continue;
    }

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      // Drop if value matches an email pattern
      if (EMAIL_REGEX.test(trimmed)) {
        continue;
      }
      // Drop if value matches a phone number pattern
      if (PHONE_REGEX.test(trimmed.replace(/\s+/g, ''))) {
        continue;
      }
      clean[key] = trimmed;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    } else if (Array.isArray(value)) {
      clean[key] = value.map((item) =>
        typeof item === 'object' && item !== null ? sanitizeAnalyticsParams(item) : item
      );
    } else if (typeof value === 'object') {
      clean[key] = sanitizeAnalyticsParams(value);
    }
  }

  return clean;
}

// Memory deduplication cache for event triggers (prevents double fires on React renders)
const eventDedupeCache = new Map<string, number>();

function shouldDedupe(eventKey: string, windowMs = 400): boolean {
  const now = Date.now();
  const lastTime = eventDedupeCache.get(eventKey);
  if (lastTime && now - lastTime < windowMs) {
    return true;
  }
  eventDedupeCache.set(eventKey, now);
  // Keep cache small
  if (eventDedupeCache.size > 100) {
    const oldestKey = eventDedupeCache.keys().next().value;
    if (oldestKey) eventDedupeCache.delete(oldestKey);
  }
  return false;
}

/**
 * Core dataLayer pusher
 */
export function pushToDataLayer(event: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  const sanitized = sanitizeAnalyticsParams(params);
  const payload = {
    event,
    ...sanitized,
    page_location: window.location.href,
    page_path: window.location.pathname,
  };

  // 1. Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // 2. Also pass to window.gtag if directly active (without GTM or during hybrid mode)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', event, sanitized);
    } catch {
      // Ignore gtag invocation failure
    }
  }

  // 3. Local offline log for in-browser admin review
  try {
    const raw = localStorage.getItem('msk_analytics_events');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({
      event,
      params: sanitized,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
    });
    localStorage.setItem('msk_analytics_events', JSON.stringify(list.slice(0, 100)));
  } catch {
    // Ignore storage issues
  }
}

// ============================================================================
// Specialized Event Trackers
// ============================================================================

/**
 * Standard Pageview
 */
export function trackPageView(url: string, title?: string): void {
  if (shouldDedupe(`page_view:${url}`)) return;
  pushToDataLayer('page_view', {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
}

/**
 * Course View (Triggered on viewing a course detail page)
 */
export interface CourseViewData {
  courseId: string;
  courseName: string;
  courseCategory?: string;
  courseDuration?: string;
  coursePrice?: number | string;
  courseMode?: string;
}

export function trackCourseView(data: CourseViewData): void {
  if (shouldDedupe(`course_view:${data.courseId}`)) return;
  pushToDataLayer('course_view', {
    course_id: data.courseId,
    course_name: data.courseName,
    course_category: data.courseCategory || 'Computer Training',
    course_duration: data.courseDuration || '',
    course_price: data.coursePrice || 0,
    course_mode: data.courseMode || 'BOTH',
  });
}

/**
 * Course Enquiry Click
 */
export function trackCourseEnquiry(data: Partial<CourseViewData>): void {
  pushToDataLayer('course_enquiry', {
    course_id: data.courseId || '',
    course_name: data.courseName || '',
    course_category: data.courseCategory || '',
    course_price: data.coursePrice || 0,
    course_mode: data.courseMode || '',
  });
}

/**
 * Course Registration Success
 */
export function trackCourseRegister(data: Partial<CourseViewData>): void {
  pushToDataLayer('course_register', {
    course_id: data.courseId || '',
    course_name: data.courseName || '',
    course_category: data.courseCategory || '',
    course_price: data.coursePrice || 0,
    course_mode: data.courseMode || '',
  });
}

/**
 * Live Batch View (Triggered on viewing a live batch page)
 */
export interface BatchViewData {
  batchId: string;
  batchName: string;
  courseName?: string;
  batchStartDate?: string;
  coursePrice?: number | string;
  courseMode?: string;
}

export function trackBatchView(data: BatchViewData): void {
  if (shouldDedupe(`batch_view:${data.batchId}`)) return;
  pushToDataLayer('batch_view', {
    batch_id: data.batchId,
    batch_name: data.batchName,
    course_name: data.courseName || data.batchName,
    batch_start_date: data.batchStartDate || '',
    course_price: data.coursePrice || 0,
    course_mode: data.courseMode || 'ONLINE',
  });
}

/**
 * Live Batch Registration Success
 */
export function trackBatchRegister(data: BatchViewData): void {
  pushToDataLayer('batch_register', {
    batch_id: data.batchId,
    batch_name: data.batchName,
    course_name: data.courseName || data.batchName,
    batch_start_date: data.batchStartDate || '',
    course_price: data.coursePrice || 0,
    course_mode: data.courseMode || 'ONLINE',
  });
}

/**
 * WhatsApp Click Tracking
 * Note: Never passes visitor's phone number or message content.
 */
export function trackWhatsAppClick(params: {
  buttonText?: string;
  courseName?: string;
  linkUrl?: string;
}): void {
  if (shouldDedupe(`whatsapp_click:${params.buttonText || ''}:${params.linkUrl || ''}`)) return;
  pushToDataLayer('whatsapp_click', {
    button_text: params.buttonText || 'WhatsApp',
    course_name: params.courseName || '',
    link_url: params.linkUrl || '',
  });
}

/**
 * Phone Click Tracking
 * Note: Never passes the phone number as an analytics parameter.
 */
export function trackPhoneClick(params: { buttonText?: string } = {}): void {
  if (shouldDedupe(`phone_click:${params.buttonText || ''}`)) return;
  pushToDataLayer('phone_click', {
    button_text: params.buttonText || 'Call Us',
  });
}

/**
 * Email Click Tracking
 * Note: Never passes the email address as an analytics parameter.
 */
export function trackEmailClick(params: { buttonText?: string } = {}): void {
  if (shouldDedupe(`email_click:${params.buttonText || ''}`)) return;
  pushToDataLayer('email_click', {
    button_text: params.buttonText || 'Email Us',
  });
}

/**
 * Form Start (Fires when user interacts with first input field)
 */
const activeFormStarts = new Set<string>();

export function trackFormStart(formName: string): void {
  if (activeFormStarts.has(formName)) return;
  activeFormStarts.add(formName);
  pushToDataLayer('form_start', {
    form_name: formName,
  });
}

/**
 * Form Submit
 */
export function trackFormSubmit(formName: string, additionalParams: Record<string, any> = {}): void {
  pushToDataLayer('form_submit', {
    form_name: formName,
    ...additionalParams,
  });
}

/**
 * Generate Lead (Fires ONLY after verified successful submission)
 */
export function trackGenerateLead(formName: string, details: Record<string, any> = {}): void {
  activeFormStarts.delete(formName);
  pushToDataLayer('generate_lead', {
    form_name: formName,
    ...details,
  });
}

/**
 * File / Notes / Cheatsheet / Brochure Downloads
 */
export function trackFileDownload(params: {
  fileName: string;
  fileExtension?: string;
  downloadType: 'brochure' | 'notes' | 'cheatsheet' | 'syllabus' | 'offline_guide' | 'other';
}): void {
  const ext = params.fileExtension || params.fileName.split('.').pop() || 'pdf';

  // Push generic file_download
  pushToDataLayer('file_download', {
    file_name: params.fileName,
    file_extension: ext,
    download_type: params.downloadType,
  });

  // Push specific event if applicable
  if (params.downloadType === 'notes') {
    pushToDataLayer('notes_download', { file_name: params.fileName });
  } else if (params.downloadType === 'cheatsheet') {
    pushToDataLayer('cheatsheet_download', { file_name: params.fileName });
  } else if (params.downloadType === 'brochure') {
    pushToDataLayer('brochure_download', { file_name: params.fileName });
  } else if (params.downloadType === 'syllabus') {
    pushToDataLayer('syllabus_download', { file_name: params.fileName });
  }
}
