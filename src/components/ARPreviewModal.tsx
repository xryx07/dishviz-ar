import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Loader2 } from "lucide-react";

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
          'max-camera-orbit'?: string;
          'min-camera-orbit'?: string;
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

const getDishData = (dishName: string) => {
  const name = dishName.toLowerCase();
  if (name.includes('pasta')) {
    return { model: '/models/pasta_dish.glb', poster: pastaImage };
  }
  if (name.includes('manchurian')) {
    return { model: '/models/manchurian_dish.glb', poster: manchurianImage };
  }
  if (name.includes('noodles') || name.includes('chow')) {
    return { model: '/models/noodles_dish.glb', poster: noodlesImage };
  }
  if (name.includes('falafel') || name.includes('kebab')) {
    return { model: '/models/falafel_dish.glb', poster: kebabImage };
  }
  return { model: '/models/falafel_dish.glb', poster: kebabImage };
};

// Preload models on page load for faster AR experience
const preloadModels = () => {
  const models = [
    '/models/falafel_dish.glb',
    '/models/pasta_dish.glb',
    '/models/manchurian_dish.glb',
    '/models/noodles_dish.glb'
  ];
  
  models.forEach(model => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = model;
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Run preload once
if (typeof window !== 'undefined') {
  preloadModels();
}

export const ARPreviewModal = ({ isOpen, onClose, dishName }: ARPreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const modelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen && modelRef.current) {
      const element = modelRef.current;
      
      const handleLoad = () => {
        setIsLoading(false);
        setProgress(100);
        setHasError(false);
      };
      
      const handleProgress = (event: Event) => {
        const progressEvent = event as CustomEvent;
        if (progressEvent.detail?.totalProgress !== undefined) {
          setProgress(Math.round(progressEvent.detail.totalProgress * 100));
        }
      };

      const handleError = () => {
        setHasError(true);
        setIsLoading(false);
      };

      element.addEventListener('load', handleLoad);
      element.addEventListener('progress', handleProgress);
      element.addEventListener('error', handleError);
      
      // Check if already loaded
      if ((element as any).loaded) {
        handleLoad();
      }
      
      return () => {
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('progress', handleProgress);
        element.removeEventListener('error', handleError);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setProgress(0);
      setHasError(false);
    }
  }, [isOpen, dishName]);

  const handleARActivate = () => {
    if (modelRef.current) {
      const element = modelRef.current as any;
      if (element.activateAR) {
        element.activateAR();
      }
    }
  };

  const dishData = getDishData(dishName);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[75vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{dishName} - AR Preview</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background relative min-h-0">
          {/* Poster image shows immediately while model loads */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-10">
              <img 
                src={dishData.poster} 
                alt={dishName}
                className="w-full h-full object-contain opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {progress > 0 ? `Loading... ${progress}%` : 'Preparing 3D model...'}
                </p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 gap-4">
              <p className="text-sm text-muted-foreground">Failed to load model. Please try again.</p>
              <Button onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setProgress(0);
              }}>
                Retry
              </Button>
            </div>
          )}

          <model-viewer
            ref={modelRef as React.RefObject<HTMLElement>}
            src={dishData.model}
            poster={dishData.poster}
            alt={`3D model of ${dishName}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="30deg"
            shadow-intensity="0"
            exposure="1"
            loading="eager"
            reveal="auto"
            interaction-prompt="none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={handleARActivate}
            className="w-full gap-2"
            size="lg"
            disabled={isLoading}
          >
            <Smartphone className="w-5 h-5" />
            {isLoading ? 'Loading...' : 'Launch AR on Your Device'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Drag to rotate • Pinch to zoom • Auto-rotating
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
