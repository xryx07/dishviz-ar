import { useState, useEffect } from "react";
import { X, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Detect in-app browsers
const isInAppBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /FBAN|FBAV|Instagram|Twitter|LinkedIn|TikTok|Snapchat|MicroMessenger|Line\/|Messenger/i.test(ua);
};

const isIOSDevice = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const SafariBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on iOS in-app browsers
    if (isIOSDevice() && isInAppBrowser() && !dismissed) {
      setShowBanner(true);
    }
  }, [dismissed]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied! Paste in Safari to view AR.");
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Link copied! Paste in Safari to view AR.");
    }
  };

  const handleOpenSafari = () => {
    // This opens the system share sheet on iOS which allows opening in Safari
    if (navigator.share) {
      navigator.share({
        title: "AR Menu",
        url: window.location.href,
      }).catch(() => {
        // User cancelled or share failed
        handleCopyLink();
      });
    } else {
      handleCopyLink();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">
            📱 Open in Safari for AR Experience
          </p>
          <p className="text-xs opacity-90 mt-0.5">
            AR features require Safari. Tap below to open.
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={handleOpenSafari}
            size="sm"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs px-2 h-8"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Open
          </Button>
          <Button
            onClick={handleCopyLink}
            size="sm"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs px-2 h-8"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
