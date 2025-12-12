import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

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
import noodlesImage from "@/assets/dish-noodles.jpg";

// Supabase storage URL for USDZ files
const STORAGE_URL = 'https://boccbckwqkmtmmtsqybv.supabase.co/storage/v1/object/public/models';

const getDishData = (dishName: string) => {
  const name = dishName.toLowerCase();
  
  // USDZ files use actual names from storage (URL encoded)
  if (name.includes('pasta') || name.includes('manchurian')) {
    return { 
      model: `/models/${name.includes('pasta') ? 'pasta' : 'manchurian'}_dish.glb`, 
      iosModel: `${STORAGE_URL}/braised%2Bpork%2B3d%2Bmodel.usdz`, 
      poster: name.includes('pasta') ? pastaImage : manchurianImage 
    };
  }
  if (name.includes('noodles') || name.includes('chow')) {
    return { 
      model: '/models/noodles_dish.glb', 
      iosModel: `${STORAGE_URL}/stir-fried%2Bnoodles%2B3d%2Bmodel.usdz`, 
      poster: noodlesImage 
    };
  }
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

// Preload models immediately
const modelCache = new Map<string, boolean>();
const preloadModels = () => {
  const models = [
    '/models/falafel_dish.glb',
    '/models/pasta_dish.glb',
    '/models/manchurian_dish.glb',
    '/models/noodles_dish.glb'
  ];
  
  models.forEach(model => {
    if (!modelCache.has(model)) {
      fetch(model, { cache: 'force-cache' })
        .then(() => modelCache.set(model, true))
        .catch(() => {});
    }
  });
};

if (typeof window !== 'undefined') {
  preloadModels();
}

export const ARPreviewModal = ({ isOpen, onClose, dishName }: ARPreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const modelRef = useRef<HTMLElement>(null);

  // Check AR support
  useEffect(() => {
    const checkARSupport = async () => {
      // Check if on mobile
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      if (!isMobile) {
        setArSupported(false);
        return;
      }

      // Check for WebXR support
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

      // Check for iOS AR Quick Look support (Safari on iOS)
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
      
      if (isIOS && isSafari) {
        setArSupported(true);
        return;
      }

      // Check for Android Scene Viewer support
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isChrome = /Chrome/i.test(navigator.userAgent);
      
      if (isAndroid && isChrome) {
        // Most modern Android Chrome supports Scene Viewer, but not all devices have ARCore
        // We'll optimistically assume support but the button will gracefully fail
        setArSupported(true);
        return;
      }

      setArSupported(false);
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

    if (element) {
      element.addEventListener('load', handleLoad);
      element.addEventListener('progress', handleProgress);
      element.addEventListener('error', handleError);

      if ((element as any).loaded) {
        handleLoad();
      }
    }

    // Simulate progress if real progress events aren't firing
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) return prev + Math.random() * 15;
        return prev;
      });
    }, 300);

    // Fallback: hide loading after 5 seconds even if not fully loaded
    fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
      setProgress(100);
    }, 5000);

    return () => {
      if (element) {
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('progress', handleProgress);
        element.removeEventListener('error', handleError);
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

  const handleARActivate = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (modelRef.current) {
      const element = modelRef.current as any;
      
      // Try model-viewer's built-in AR first (works when ios-src USDZ is available)
      if (element.canActivateAR) {
        element.activateAR();
        return;
      }
      
      // Fallback for iOS: Try to open USDZ directly via AR Quick Look
      if (isIOS) {
        const usdzUrl = dishData.iosModel; // Already full URL from storage
        const anchor = document.createElement('a');
        anchor.setAttribute('rel', 'ar');
        anchor.setAttribute('href', usdzUrl);
        const img = document.createElement('img');
        anchor.appendChild(img);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        return;
      }
      
      // Fallback for Android: Open Scene Viewer directly
      if (isAndroid) {
        const modelUrl = `${window.location.origin}${dishData.model}`;
        const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelUrl)}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
        window.location.href = sceneViewerUrl;
        return;
      }
    }
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
          {arSupported === false ? (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                AR not available on this device
              </p>
              <p className="text-xs text-muted-foreground">
                AR requires a compatible mobile device (iPhone 6s+ with Safari, or Android with Chrome and ARCore support). You can still interact with the 3D model above!
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleARActivate}
              className="w-full gap-2"
              size="lg"
              disabled={arSupported === null}
            >
              <Smartphone className="w-5 h-5" />
              {arSupported === null ? 'Checking AR...' : 'View in AR'}
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
