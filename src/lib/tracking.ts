'use client';

// Google Analytics & Telemetry Tracking Helper for MSK Institute

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MSKINSTITUTE';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Log event locally for offline / in-browser admin review
function logLocalEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('msk_analytics_events');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({
      event: eventName,
      params: params || {},
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
    });
    // Keep last 100 events
    localStorage.setItem('msk_analytics_events', JSON.stringify(list.slice(0, 100)));
  } catch {
    // ignore storage errors
  }
}

// Track standard Pageviews
export function pageview(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
  logLocalEvent('page_view', { path: url, title: title || (typeof document !== 'undefined' ? document.title : '') });
}

// Track generic custom events
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
  logLocalEvent(action, params);
}

// Specialized Conversion & Telemetry Trackers
export function trackLeadSubmission(formType: string, details: Record<string, any> = {}) {
  trackEvent('lead_generation', {
    form_name: formType,
    ...details,
  });
}

export function trackDemoBooking(courseTitle: string, details: Record<string, any> = {}) {
  trackEvent('demo_booking_submitted', {
    course: courseTitle,
    ...details,
  });
}

export function trackBatchEnrollment(batchId: string, batchTitle: string, details: Record<string, any> = {}) {
  trackEvent('batch_enrollment_submitted', {
    batch_id: batchId,
    batch_title: batchTitle,
    ...details,
  });
}

export function trackCertificateVerification(certificateId: string, isValid: boolean) {
  trackEvent('certificate_verification_search', {
    certificate_id: certificateId,
    is_valid: isValid,
  });
}

export function trackPwaInstall() {
  trackEvent('pwa_app_installed', {
    platform: typeof window !== 'undefined' ? window.navigator.platform : 'unknown',
    installed_at: new Date().toISOString(),
  });
}

export function trackContactClick(channel: 'call' | 'whatsapp' | 'email' | 'maps', targetValue?: string) {
  trackEvent('contact_channel_click', {
    channel,
    target: targetValue || '',
  });
}

export function trackNoteDownload(noteTitle: string, isPaid: boolean) {
  trackEvent(isPaid ? 'paid_note_inquiry' : 'free_note_download', {
    note_title: noteTitle,
    is_paid: isPaid,
  });
}

export function trackCourseView(courseId: string, courseTitle: string) {
  trackEvent('view_course_detail', {
    course_id: courseId,
    course_title: courseTitle,
  });
}

// Retrieve local telemetry events for Admin dashboard
export function getLocalAnalyticsEvents(): Array<{
  event: string;
  params: Record<string, any>;
  timestamp: string;
  url: string;
}> {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('msk_analytics_events');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
