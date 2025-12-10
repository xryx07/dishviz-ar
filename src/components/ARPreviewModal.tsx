import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const modelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen && modelRef.current) {
      const handleLoad = () => {
        setIsLoading(false);
        setProgress(100);
      };
      
      const handleProgress = (event: Event) => {
        const progressEvent = event as CustomEvent;
        if (progressEvent.detail?.totalProgress) {
          setProgress(Math.round(progressEvent.detail.totalProgress * 100));
        }
      };

      modelRef.current.addEventListener('load', handleLoad);
      modelRef.current.addEventListener('progress', handleProgress);
      
      return () => {
        modelRef.current?.removeEventListener('load', handleLoad);
        modelRef.current?.removeEventListener('progress', handleProgress);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setProgress(0);
    }
  }, [isOpen, dishName]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[70vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{dishName} - AR Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 gap-4">
              {/* Skeleton loader */}
              <div className="relative w-32 h-32">
                <Skeleton className="w-full h-full rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">Loading 3D model... {progress}%</p>
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
            shadow-intensity="0.5"
            exposure="0.8"
            loading="eager"
            reveal="auto"
            environment-image="neutral"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Drag to rotate • Pinch to zoom • Auto-rotating
        </p>
      </DialogContent>
    </Dialog>
  );
};
