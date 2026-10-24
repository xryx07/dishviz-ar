import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Smartphone, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Detect in-app browsers that don't support AR
const isInAppBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  // Instagram, Facebook, Twitter, LinkedIn, TikTok, Snapchat, WeChat, etc.
  return /FBAN|FBAV|Instagram|Twitter|LinkedIn|TikTok|Snapchat|MicroMessenger|Line\//i.test(ua);
};

const isIOSDevice = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

interface ARPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          'ios-src'?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string;
          exposure?: string;
          loading?: string;
          reveal?: string;
          poster?: string;
          'environment-image'?: string;
          'auto-rotate-delay'?: string;
          'rotation-per-second'?: string;
          'interaction-prompt'?: string;
        },
        HTMLElement
      >;
    }
  }
}

import kebabImage from "@/assets/dish-kebab.jpg";
import pastaImage from "@/assets/dish-pasta.jpg";
import manchurianImage from "@/assets/dish-manchurian.jpg";

// Supabase storage URL for USDZ files
const STORAGE_URL = 'https://boccbckwqkmtmmtsqybv.supabase.co/storage/v1/object/public/models';

const getDishData = (dishName: string) => {
  const name = dishName.toLowerCase();
  
  // Pasta dish
  if (name.includes('pasta')) {
    return { 
      model: '/models/pasta_dish.glb', 
      iosModel: `${STORAGE_URL}/pasta%2Bdish%2B3d%2Bmodel.usdz`, 
      poster: pastaImage 
    };
  }
  // Manchurian dish - uses braised pork USDZ
  if (name.includes('manchurian')) {
    return { 
      model: '/models/manchurian_dish.glb', 
      iosModel: `${STORAGE_URL}/braised%2Bpork%2B3d%2Bmodel.usdz`, 
      poster: manchurianImage 
    };
  }
  // Falafel/Kebab dish
  if (name.includes('falafel') || name.includes('kebab')) {
    return { 
      model: '/models/falafel_dish.glb', 
      iosModel: `${STORAGE_URL}/falafel%2Bballs%2B3d%2Bmodel.usdz`, 
      poster: kebabImage 
    };
  }
  // Default to falafel
  return { 
    model: '/models/falafel_dish.glb', 
    iosModel: `${STORAGE_URL}/falafel%2Bballs%2B3d%2Bmodel.usdz`, 
    poster: kebabImage 
  };
};

// Model cache with preloaded data
const modelCache = new Map<string, Promise<void>>();

// Preload a single model with high priority
export const preloadModel = (modelPath: string) => {
  if (modelCache.has(modelPath)) return modelCache.get(modelPath);
  
  const promise = fetch(modelPath, { 
    cache: 'force-cache',
    priority: 'high' as RequestPriority
  }).then(() => {}).catch(() => {});
  
  modelCache.set(modelPath, promise);
  return promise;
};

// Preload all models immediately for faster access
export const preloadAllModels = () => {
  const models = [
    '/models/pasta_dish.glb',
    '/models/manchurian_dish.glb',
    '/models/falafel_dish.glb',
  ];
  models.forEach(m => preloadModel(m));
};

// Preload USDZ for iOS
const preloadUSDZ = (usdzUrl: string) => {
  if (modelCache.has(usdzUrl)) return;
  
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isIOS) {
    const promise = fetch(usdzUrl, { 
      cache: 'force-cache',
      mode: 'cors',
      credentials: 'omit'
    }).then(() => {}).catch(() => {});
    modelCache.set(usdzUrl, promise);
  }
};

export const ARPreviewModal = ({ isOpen, onClose, dishName }: ARPreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [showInAppWarning, setShowInAppWarning] = useState(false);
  const modelRef = useRef<HTMLElement>(null);

  // Check for in-app browser on iOS
  useEffect(() => {
    if (isOpen && isIOSDevice() && isInAppBrowser()) {
      setShowInAppWarning(true);
    } else {
      setShowInAppWarning(false);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied! Open Safari and paste to view AR.");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Check AR support
  useEffect(() => {
    const checkARSupport = async () => {
      // Check model-viewer element's canActivateAR property if already mounted
      const element = modelRef.current as any;
      if (element?.canActivateAR) {
        setArSupported(true);
        return;
      }

      // Check if on mobile device
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      
      if (!isMobile) {
        // Desktop / Laptop: check if WebXR device or simulator is active
        if ('xr' in navigator) {
          try {
            const supported = await (navigator as any).xr?.isSessionSupported?.('immersive-ar');
            if (supported) {
              setArSupported(true);
              return;
            }
          } catch (e) {
            // WebXR not available
          }
        }
        setArSupported(false);
        return;
      }

      // On mobile devices (iOS / Android), default to true because:
      // - iOS 12+ supports AR Quick Look (.usdz) across all browsers
      // - Modern Android (Chrome, Samsung Internet, Edge, etc.) supports WebXR and Scene Viewer
      setArSupported(true);
    };

    if (isOpen) {
      checkARSupport();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const element = modelRef.current;
    let progressInterval: ReturnType<typeof setInterval> | undefined;
    let fallbackTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleLoad = () => {
      if (progressInterval) clearInterval(progressInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      setIsLoading(false);
      setProgress(100);
      setHasError(false);

      if ((element as any)?.canActivateAR) {
        setArSupported(true);
      }
    };

    const handleProgress = (event: Event) => {
      const progressEvent = event as CustomEvent;
      if (progressEvent.detail?.totalProgress !== undefined) {
        const realProgress = Math.round(progressEvent.detail.totalProgress * 100);
        setProgress(prev => Math.max(prev, realProgress));
      }
    };

    const handleError = () => {
      if (progressInterval) clearInterval(progressInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      setHasError(true);
      setIsLoading(false);
    };

    const handleARStatus = (event: Event) => {
      const status = (event as CustomEvent).detail?.status;
      if (status === 'failed') {
        toast.error("AR session failed to start. Make sure your device AR services are enabled.");
      } else if (status === 'session-started') {
        toast.success("AR session started!");
      }
    };

    if (element) {
      element.addEventListener('load', handleLoad);
      element.addEventListener('progress', handleProgress);
      element.addEventListener('error', handleError);
      element.addEventListener('ar-status', handleARStatus);

      if ((element as any).loaded) {
        handleLoad();
      }
    }

    // Simulate progress faster - models should be cached
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) return prev + Math.random() * 30;
        return prev;
      });
    }, 100);

    // Fast fallback: hide loading after 800ms (models are preloaded)
    fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
      setProgress(100);
    }, 800);

    return () => {
      if (element) {
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('progress', handleProgress);
        element.removeEventListener('error', handleError);
        element.removeEventListener('ar-status', handleARStatus);
      }
      if (progressInterval) clearInterval(progressInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setProgress(0);
      setHasError(false);
      setImageLoaded(false);
    }
  }, [isOpen, dishName]);

  const handleARActivate = async () => {
    const element = modelRef.current as any;

    // 1. Primary method: Use Google model-viewer's standard activateAR()
    // This handles WebXR -> Scene Viewer -> iOS Quick Look with built-in device capability negotiation
    if (element && typeof element.activateAR === 'function') {
      try {
        await element.activateAR();
        return;
      } catch (err) {
        console.warn("model-viewer activateAR encountered an issue, trying platform fallback:", err);
      }
    }

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // 2. iOS Fallback: Direct Apple Quick Look (.usdz)
    if (isIOS && dishData.iosModel) {
      try {
        const anchor = document.createElement("a");
        anchor.setAttribute("rel", "ar");
        anchor.setAttribute("href", dishData.iosModel);
        const img = document.createElement("img");
        anchor.appendChild(img);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        return;
      } catch (err) {
        console.error("iOS Quick Look fallback failed:", err);
      }
    }

    // 3. Android Fallback: Google Scene Viewer with absolute URL
    if (isAndroid) {
      try {
        const fullModelUrl = new URL(dishData.model, window.location.href).href;
        const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
          fullModelUrl
        )}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
          window.location.href
        )};end;`;
        window.location.href = sceneViewerUrl;
        return;
      } catch (err) {
        console.error("Android Scene Viewer fallback failed:", err);
      }
    }

    toast.error("AR could not be opened on this device.");
  };

  const dishData = getDishData(dishName);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[75vh] flex flex-col p-4 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-playfair">{dishName}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full rounded-2xl overflow-hidden bg-muted/50 relative min-h-0">
          <AnimatePresence>
            {isLoading && !hasError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                {/* Animated background image */}
                <motion.img 
                  src={dishData.poster} 
                  alt={dishName}
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: imageLoaded ? 0.4 : 0, 
                    scale: 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover blur-sm"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/60" />
                
                {/* Loading spinner and progress */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative z-10 flex flex-col items-center gap-4"
                >
                  {/* Circular progress */}
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className="text-primary"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          strokeDasharray: "226",
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-foreground">{progress}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-medium">
                    Loading 3D Model...
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 gap-4">
              <p className="text-sm text-muted-foreground">Failed to load. Please try again.</p>
              <Button onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setProgress(0);
              }} size="sm">
                Retry
              </Button>
            </div>
          )}

          <model-viewer
            ref={modelRef as React.RefObject<HTMLElement>}
            src={dishData.model}
            ios-src={dishData.iosModel}
            poster={dishData.poster}
            alt={`3D model of ${dishName}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="auto"
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="45deg"
            shadow-intensity="0"
            exposure="1"
            loading="eager"
            reveal="auto"
            interaction-prompt="none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        <div className="flex flex-col gap-2 pt-3">
          {showInAppWarning ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-foreground mb-2">
                📱 Open in Safari for AR
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                AR doesn't work in this browser. Copy the link below and open it in Safari to view in AR.
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopyLink}
                  className="flex-1 gap-2"
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </Button>
                <Button 
                  onClick={() => {
                    // Try to open in Safari (works on some devices)
                    window.open(window.location.href, '_blank');
                  }}
                  className="flex-1 gap-2"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Browser
                </Button>
              </div>
            </div>
          ) : arSupported === false ? (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                AR works best on mobile devices
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                To project this 3D dish onto your table in real-world AR, open this site on your smartphone (iPhone with Safari, or Android with Chrome).
              </p>
              <Button 
                onClick={handleARActivate}
                variant="outline"
                size="sm"
                className="gap-2 border-foreground/20 text-foreground hover:bg-foreground/10 text-xs"
              >
                <Smartphone className="w-4 h-4" />
                Launch AR Anyway
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleARActivate}
              className="w-full gap-2"
              size="lg"
            >
              <Smartphone className="w-5 h-5" />
              View in AR
            </Button>
          )}
          <p className="text-center text-xs text-muted-foreground">
            Drag to rotate • Pinch to zoom
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
