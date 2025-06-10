import { Wallpaper } from "@/types";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}

export default function PreviewModal({ wallpaper, onClose }: PreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className="w-full h-full max-h-[70vh] object-contain"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-white">{wallpaper.title}</h3>
            <div className="flex gap-2 mt-2">
              {wallpaper.categories.map(category => (
                <span key={category} className="text-sm bg-white/20 text-white px-3 py-1 rounded-full">
                  {category}
                </span>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400">{wallpaper.downloads} downloads</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <i className="fa-solid fa-download mr-2"></i>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}