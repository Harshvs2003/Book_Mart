import React, { useState } from "react";
import "../styles/CategoryMenu.css";

interface Props {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export default function CategoryMenu({ categories, onSelectCategory }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="category-menu">
      <h3 onClick={toggleExpand} style={{ cursor: "pointer" }}>
        Categories {isExpanded ? "▲" : "▼"}
      </h3>

      {isExpanded && (
        <ul>
          {categories.map((cat) => (
            <li key={cat} onClick={() => onSelectCategory(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
