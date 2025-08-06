"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TagListProps {
  tags: Array<{ name: string }>;
  initialDisplayCount?: number;
}

export function TagList({ tags, initialDisplayCount = 3 }: TagListProps) {

  const [isHoveredBadge, setIsHoveredBadge] = useState(false); // Adicionando controle para o hover do "badge"

  const handleBadgeMouseEnter = () => {
    setIsHoveredBadge(true);
  };

  const handleBadgeMouseLeave = () => {
    setIsHoveredBadge(false);
  };

  return (
    <div className="space-x-2 relative inline-block">
      {/* Renderiza as tags visíveis */}
      {tags.slice(0, initialDisplayCount).map((tag, index) => (
        <Badge
          key={index}
          className={`text-xs ${
            initialDisplayCount === 20
              ? "bg-gray-100 text-gray-600"
              : "bg-teal-600 text-white"
          } px-2 py- rounded-md`}
        >
          {tag.name}
        </Badge>
      ))}

      {/* Exibe o "badge +x" quando houver mais tags */}
      {tags.length > initialDisplayCount && (
        <Badge
          className={`text-xs ${
            initialDisplayCount === 20
              ? "bg-gray-100 text-gray-600"
              : "bg-teal-600 text-white"
          } px-2 py- rounded-md cursor-pointer`}
          onMouseEnter={handleBadgeMouseEnter}  // Agora usa o controle do "badge"
          onMouseLeave={handleBadgeMouseLeave}  // Agora usa o controle do "badge"
        >
          +{tags.length - initialDisplayCount}
        </Badge>
      )}

      {/* Tooltip com as tags extras ao passar o mouse */}
      {( isHoveredBadge) && tags.length > initialDisplayCount && (
        <div className="absolute bottom-8 mt-2 -right-12 bg-white rounded-lg shadow-lg p-2 space-y-1 z-10 w-[300px]">
          {tags.slice(initialDisplayCount).map((tag, index) => (
            <Badge
              key={index}
              className={`text-xs bg-teal-600 text-white px-2 py- rounded-md`}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
