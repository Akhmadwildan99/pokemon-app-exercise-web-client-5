import React, { useState } from "react";
import "./SortAndToggle.scss";

interface SortAndToggleProps {
  onSortChange: (sortOption: string) => void;
  onViewChange: (view: "list" | "grid") => void;
}

const SortAndToggle: React.FC<SortAndToggleProps> = ({
  onSortChange,
  onViewChange,
}) => {
  const [sortOption, setSortOption] = useState("name");
  const [view, setView] = useState<"list" | "grid">("grid");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const handleViewChange = (newView: "list" | "grid") => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="sort-and-toggle">
      <div className="sort-container">
        {/* <label htmlFor="sort-select" className="sort-label">
          Sort by
        </label> */}
        <select
          id="sort-select"
          value={sortOption}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="name">Name</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
          <option value="hp">HP</option>
        </select>
      </div>
      <div className="view-toggle">
        <button
          className={`view-button view-button-list ${view === "list" ? "active" : ""}`}
          onClick={() => handleViewChange("list")}
          aria-label="List View"
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="9" height="9" fill="#97A0CC" />
          </svg>
        </button>
        <button
          className={`view-button view-button-grid ${view === "grid" ? "active" : ""}`}
          onClick={() => handleViewChange("grid")}
          aria-label="Grid View"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="6" height="6" fill="#97A0CC" />
            <rect y="8" width="6" height="6" fill="#97A0CC" />
            <rect x="8" width="6" height="6" fill="#97A0CC" />
            <rect x="8" y="8" width="6" height="6" fill="#97A0CC" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SortAndToggle;
