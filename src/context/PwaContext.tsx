'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { trackPwaInstall, trackEvent } from '@/lib/tracking';

// Define the BeforeInstallPromptEvent interface
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent | null;
  }
}

interface PwaContextType {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
  isNativePromptAvailable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  installApp: () => Promise<boolean>;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if prompt was already captured by inline head script
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
    }

    // Comprehensive check for installed / standalone PWA mode
    const checkIsInstalled = () => {
      const isStandaloneMedia =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: window-controls-overlay)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches;

      const isIosStandalone =
        // @ts-expect-error iOS Safari navigator.standalone check
        window.navigator.standalone === true;

      const isAndroidApp =
        document.referrer.includes('android-app://') ||
        window.location.search.includes('source=pwa');

      const isPersistedInstalled =
        localStorage.getItem('msk_pwa_installed') === 'true';

      const installed = Boolean(isStandaloneMedia || isIosStandalone || isAndroidApp || isPersistedInstalled);
      setIsInstalled(installed);
      return installed;
    };

    checkIsInstalled();

    // Check iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !('MSStream' in window);
    setIsIOS(isIosDevice);

    // Capture beforeinstallprompt event (Chrome, Android, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.deferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    // Custom event dispatched from early inline script
    const handleEarlyPromptReady = () => {
      if (window.deferredPrompt) {
        setDeferredPrompt(window.deferredPrompt);
      }
    };

    // Capture appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      window.deferredPrompt = null;
      setDeferredPrompt(null);
      try {
        localStorage.setItem('msk_pwa_installed', 'true');
      } catch {
        // ignore storage errors
      }
      trackPwaInstall();
      toast.success('MSK Institute App installed successfully!', { icon: '🎉' });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-ready', handleEarlyPromptReady);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Listen to display mode changes dynamically
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        try {
          localStorage.setItem('msk_pwa_installed', 'true');
        } catch {
          // ignore storage errors
        }
      }
    };

    if (standaloneMedia.addEventListener) {
      standaloneMedia.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-ready', handleEarlyPromptReady);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (standaloneMedia.removeEventListener) {
        standaloneMedia.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  const installApp = useCallback(async (): Promise<boolean> => {
    trackEvent('pwa_install_button_clicked');

    // 1. If already installed
    if (isInstalled) {
      toast('MSK Institute App is already installed on this device.', { icon: '📱' });
      return true;
    }

    // 2. Try stored prompt in React state or Window global
    const activePrompt = deferredPrompt || (typeof window !== 'undefined' ? window.deferredPrompt : null);

    if (activePrompt) {
      try {
        await activePrompt.prompt();
        const choiceResult = await activePrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          window.deferredPrompt = null;
          setDeferredPrompt(null);
          setIsInstalled(true);
          try {
            localStorage.setItem('msk_pwa_installed', 'true');
          } catch {
            // ignore
          }
          trackPwaInstall();
          return true;
        } else {
          trackEvent('pwa_install_dismissed');
          return false;
        }
      } catch (err) {
        console.warn('Direct PWA prompt error:', err);
      }
    }

    // 3. If iOS Safari
    if (isIOS) {
      toast(
        () => (
          <div className="text-xs space-y-1">
            <p className="font-bold text-primary">To install on iPhone/iPad:</p>
            <p>1. Tap the <strong>Share</strong> button (⎕↑) at the bottom.</p>
            <p>2. Scroll and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong> (➕).</p>
          </div>
        ),
        { duration: 6000, icon: '📲' }
      );
      return false;
    }

    // 4. If prompt not available yet in browser
    toast(
      'To install, click the Install (📲) icon in your address bar or browser menu.',
      { duration: 5000, icon: '💡' }
    );
    return false;
  }, [deferredPrompt, isInstalled, isIOS]);

  const isNativePromptAvailable = Boolean(deferredPrompt || (typeof window !== 'undefined' && window.deferredPrompt));
  const isInstallable = !isInstalled;

  return (
    <PwaContext.Provider
      value={{
        deferredPrompt,
        isInstallable,
        isNativePromptAvailable,
        isInstalled,
        isIOS,
        installApp,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
