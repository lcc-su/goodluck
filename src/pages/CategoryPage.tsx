import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { wallpapers } from "@/mock/wallpapers";
import { categories } from "@/mock/categories";
import WallpaperCard from "@/components/WallpaperCard";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import PreviewModal from "@/components/PreviewModal";
import { toast } from "sonner";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredWallpapers, setFilteredWallpapers] = useState<typeof wallpapers>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<typeof categories[0]>();
  const [previewWallpaper, setPreviewWallpaper] = useState<typeof wallpapers[0] | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  useEffect(() => {
    // Find current category
    const currentCategory = categories.find(cat => cat.id === id);
    setCategory(currentCategory);

    // Filter wallpapers by category
    const filtered = wallpapers.filter(wp => 
      wp.categories.some(cat => cat === id) &&
      (wp.title.toLowerCase().includes(searchQuery) ||
       wp.categories.some(cat => cat.toLowerCase().includes(searchQuery)))
    );
    setFilteredWallpapers(filtered);
  }, [id, searchQuery]);

  const handleWallpaperClick = (wallpaper: typeof wallpapers[0]) => {
    setPreviewWallpaper(wallpaper);
    toast.info(`Previewing: ${wallpaper.title}`);
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= filteredWallpapers.length) return null;

    const wallpaper = filteredWallpapers[index];
    return (
      <div style={style} className="p-2">
        <WallpaperCard 
          wallpaper={wallpaper} 
          onClick={() => handleWallpaperClick(wallpaper)}
        />
      </div>
    );
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
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: "Home", path: "/" },
            { label: category?.name || "Category" }
          ]} 
        />

        {/* Category Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{category?.name || "Category"}</h2>
          <p className="text-gray-400">{filteredWallpapers.length} wallpapers</p>
        </div>

        {/* Wallpapers Grid */}
        <div className="mt-8" style={{ height: 'calc(100vh - 200px)' }}>
          {filteredWallpapers.length > 0 ? (
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={Math.min(3, filteredWallpapers.length)}
                  columnWidth={Math.floor(width / Math.min(3, filteredWallpapers.length))}
                  rowCount={Math.ceil(filteredWallpapers.length / 3)}
                  rowHeight={300}
                  height={height}
                  width={width}
                >
                  {Cell}
                </Grid>
              )}
            </AutoSizer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">No wallpapers found in this category</p>
            </div>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      <PreviewModal 
        wallpaper={previewWallpaper} 
        onClose={() => setPreviewWallpaper(null)} 
      />
    </div>
  );
}