import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

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
          'environment-image'?: string;
          exposure?: string;
          poster?: string;
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
  if (name.includes('falafel') || name.includes('kebab')) {
    return '/models/falafel_dish.glb';
  }
  return '/models/falafel_dish.glb';
};

export const ARPreviewModal = ({ isOpen, onClose, dishName }: ARPreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen && modelRef.current) {
      const handleLoad = () => setIsLoading(false);
      modelRef.current.addEventListener('load', handleLoad);
      return () => {
        modelRef.current?.removeEventListener('load', handleLoad);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, dishName]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[75vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{dishName} - AR Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading 3D model...</p>
              </div>
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
            shadow-intensity="1"
            exposure="1"
            loading="eager"
            reveal="auto"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Drag to rotate • Pinch to zoom • Auto-rotating
          </p>
          <p className="text-xs text-primary font-medium">
            📱 On mobile: Tap the AR button to view in your real space!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
