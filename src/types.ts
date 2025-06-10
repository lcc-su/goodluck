export interface Wallpaper {
  id: string;
  imageUrl: string;
  title: string;
  categories: string[];
  downloads: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
