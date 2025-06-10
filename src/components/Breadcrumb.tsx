import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <i className="fa-solid fa-chevron-right text-xs"></i>
          )}
        </div>
      ))}
    </div>
  );
}