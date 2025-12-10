import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
        },
        HTMLElement
      >;
    }
  }
}

const getModelPath = (dishName: string) => {
  const name = dishName.toLowerCase();
  if (name.includes('pasta')) {
    return '/models/pasta_dish.glb';
  }
  if (name.includes('manchurian')) {
    return '/models/manchurian_dish.glb';
  }
  if (name.includes('noodles') || name.includes('chow')) {
    return '/models/noodles_dish.glb';
  }
  if (name.includes('falafel') || name.includes('kebab')) {
    return '/models/falafel_dish.glb';
  }
  return '/models/falafel_dish.glb';
};

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
      
      // Force a small progress to show loading started
      setTimeout(() => {
        if (progress === 0) setProgress(5);
      }, 100);
      
      return () => {
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('progress', handleProgress);
        element.removeEventListener('error', handleError);
      };
    }
  }, [isOpen, progress]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[75vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{dishName} - AR Preview</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background relative min-h-0">
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 gap-4">
              <div className="relative w-32 h-32">
                <Skeleton className="w-full h-full rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
              
              <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">Loading 3D model... {progress}%</p>
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
            src={getModelPath(dishName)}
            alt={`3D model of ${dishName}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="0.3"
            exposure="0.9"
            loading="eager"
            reveal="auto"
            environment-image="neutral"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={handleARActivate}
            className="w-full gap-2"
            size="lg"
          >
            <Smartphone className="w-5 h-5" />
            Launch AR on Your Device
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Drag to rotate • Pinch to zoom • Auto-rotating
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
