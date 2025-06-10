import { Category } from "@/types";
import { useNavigate } from "react-router-dom";

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map(category => (
        <button
          key={category.id}
          className="flex flex-col items-center justify-center gap-2 min-w-[80px]"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <i className={`fa-solid ${category.icon} text-xl`}></i>
          </div>
          <span className="text-sm text-white">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
