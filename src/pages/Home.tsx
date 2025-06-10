import { useState, useEffect, useCallback } from "react";
import { wallpapers } from "@/mock/wallpapers";
import { categories } from "@/mock/categories";
import WallpaperCard from "@/components/WallpaperCard";
import SearchBar from "@/components/SearchBar";
import CategoryNav from "@/components/CategoryNav";
import PreviewModal from "@/components/PreviewModal";
import { toast } from "sonner";

export default function Home() {
  const [filteredWallpapers, setFilteredWallpapers] = useState(wallpapers);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewWallpaper, setPreviewWallpaper] = useState<typeof wallpapers[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (searchQuery) {
      const filtered = wallpapers.filter(
        wp => wp.title.toLowerCase().includes(searchQuery) ||
              wp.categories.some(cat => cat.toLowerCase().includes(searchQuery))
      );
      setFilteredWallpapers(filtered);
    } else {
      setFilteredWallpapers(wallpapers);
    }
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleWallpaperClick = (wallpaper: typeof wallpapers[0]) => {
    setPreviewWallpaper(wallpaper);
    toast.info(`Previewing: ${wallpaper.title}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Wallpaper Gallery</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <CategoryNav categories={categories} />

        {/* Wallpapers Grid */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredWallpapers.map(wallpaper => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  onClick={() => handleWallpaperClick(wallpaper)}
                />
              ))}
            </div>
          )}
        </div>
      </main>


      {/* Preview Modal */}
      <PreviewModal 
        wallpaper={previewWallpaper} 
        onClose={() => setPreviewWallpaper(null)} 
      />

      {/* Footer with ICP备案信息 */}
      <footer className="w-full py-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            蜀ICP备2024116875号-1
          </a>
        </div>
      </footer>
    </div>
  );
}