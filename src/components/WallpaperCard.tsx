import { Wallpaper } from "@/types";
import { useState } from "react";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onClick: () => void;
}

export default function WallpaperCard({ wallpaper, onClick }: WallpaperCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img 
        src={wallpaper.imageUrl} 
        alt={wallpaper.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-medium">{wallpaper.title}</h3>
        <div className="flex gap-2 mt-2">
          {wallpaper.categories.map(category => (
            <span key={category} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
