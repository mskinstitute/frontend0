'use client';

/**
 * MSK Institute — Analytics & Telemetry Layer
 *
 * Provides backward-compatible tracking functions mapped to the
 * centralized, privacy-safe dataLayer architecture.
 */

import {
  pushToDataLayer,
  trackPageView as dlTrackPageView,
  trackCourseView as dlTrackCourseView,
  trackCourseEnquiry as dlTrackCourseEnquiry,
  trackCourseRegister as dlTrackCourseRegister,
  trackBatchView as dlTrackBatchView,
  trackBatchRegister as dlTrackBatchRegister,
  trackWhatsAppClick as dlTrackWhatsAppClick,
  trackPhoneClick as dlTrackPhoneClick,
  trackEmailClick as dlTrackEmailClick,
  trackFormStart as dlTrackFormStart,
  trackFormSubmit as dlTrackFormSubmit,
  trackGenerateLead as dlTrackGenerateLead,
  trackFileDownload as dlTrackFileDownload,
} from './dataLayer';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6CQ1F72VS0';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WTZ5VP6M';

// Re-export core dataLayer helpers
export {
  pushToDataLayer,
  dlTrackPageView as trackPageView,
  dlTrackCourseView as trackCourseViewDetail,
  dlTrackCourseEnquiry as trackCourseEnquiry,
  dlTrackCourseRegister as trackCourseRegister,
  dlTrackBatchView as trackBatchViewDetail,
  dlTrackBatchRegister as trackBatchRegister,
  dlTrackWhatsAppClick as trackWhatsAppClick,
  dlTrackPhoneClick as trackPhoneClick,
  dlTrackEmailClick as trackEmailClick,
  dlTrackFormStart as trackFormStart,
  dlTrackFormSubmit as trackFormSubmit,
  dlTrackGenerateLead as trackGenerateLead,
  dlTrackFileDownload as trackFileDownload,
};

// Track standard Pageviews
export function pageview(url: string, title?: string) {
  dlTrackPageView(url, title);
}

// Track generic custom events (sanitized through dataLayer)
export function trackEvent(action: string, params: Record<string, any> = {}) {
  pushToDataLayer(action, params);
}

// Specialized Conversion & Telemetry Trackers
export function trackLeadSubmission(formType: string, details: Record<string, any> = {}) {
  dlTrackGenerateLead(formType, details);
}

export function trackDemoBooking(courseTitle: string, details: Record<string, any> = {}) {
  dlTrackFormSubmit('demo_booking', { course_name: courseTitle });
  dlTrackGenerateLead('demo_booking', {
    course_name: courseTitle,
    preferred_date: details.preferred_date || '',
  });
}

export function trackBatchEnrollment(batchId: string, batchTitle: string, details: Record<string, any> = {}) {
  dlTrackFormSubmit('batch_enrollment', {
    batch_id: batchId,
    batch_name: batchTitle,
  });
  dlTrackGenerateLead('batch_enrollment', {
    batch_id: batchId,
    batch_name: batchTitle,
    course_name: details.course || batchTitle,
    course_mode: details.mode || 'ONLINE',
    course_price: details.price || 0,
  });
  dlTrackBatchRegister({
    batchId,
    batchName: batchTitle,
    courseName: details.course || batchTitle,
    courseMode: details.mode || 'ONLINE',
    coursePrice: details.price || 0,
  });
}

export function trackCertificateVerification(certificateId: string, isValid: boolean) {
  pushToDataLayer('certificate_verification_search', {
    is_valid: isValid,
    // Note: Do not send full certificate details or user names
  });
}

export function trackPwaInstall() {
  pushToDataLayer('pwa_app_installed', {
    platform: typeof window !== 'undefined' ? window.navigator.platform : 'unknown',
    installed_at: new Date().toISOString(),
  });
}

export function trackContactClick(channel: 'call' | 'whatsapp' | 'email' | 'maps', targetValue?: string) {
  switch (channel) {
    case 'whatsapp':
      dlTrackWhatsAppClick({ buttonText: 'WhatsApp Contact' });
      break;
    case 'call':
      dlTrackPhoneClick({ buttonText: 'Phone Contact' });
      break;
    case 'email':
      dlTrackEmailClick({ buttonText: 'Email Contact' });
      break;
    case 'maps':
      pushToDataLayer('outbound_click', {
        destination: 'google_maps',
        link_url: 'https://maps.google.com/?q=MSK+Institute+Shikohabad',
      });
      break;
  }
}

export function trackNoteDownload(noteTitle: string, isPaid: boolean) {
  if (isPaid) {
    dlTrackFormSubmit('paid_note_inquiry', { note_title: noteTitle });
    dlTrackGenerateLead('paid_note_inquiry', { note_title: noteTitle });
  } else {
    dlTrackFileDownload({
      fileName: noteTitle,
      downloadType: 'notes',
    });
  }
}

export function trackCourseView(courseId: string, courseTitle: string) {
  dlTrackCourseView({
    courseId,
    courseName: courseTitle,
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
