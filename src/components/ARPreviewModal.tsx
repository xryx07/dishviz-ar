import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, lazy } from "react";

const PastaGLBModel = lazy(() => import("./PastaGLBModel").then(m => ({ default: m.PastaGLBModel })));
const FalafelGLBModel = lazy(() => import("./FalafelGLBModel").then(m => ({ default: m.FalafelGLBModel })));

interface ARPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
}

const getDishModel = (dishName: string) => {
  const name = dishName.toLowerCase();
  if (name.includes('pasta')) {
    return <PastaGLBModel />;
  }
  if (name.includes('falafel')) {
    return <FalafelGLBModel />;
  }
  // Default to falafel model for kebab (similar appearance)
  return <FalafelGLBModel />;
};

export const ARPreviewModal = ({ isOpen, onClose, dishName }: ARPreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[70vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{dishName} - AR Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-background">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <Suspense fallback={null}>
              {getDishModel(dishName)}
              <OrbitControls 
                enableZoom={true}
                autoRotate={true}
                autoRotateSpeed={2}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Suspense>
          </Canvas>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Drag to rotate • Scroll to zoom • Auto-rotating
        </p>
      </DialogContent>
    </Dialog>
  );
};
