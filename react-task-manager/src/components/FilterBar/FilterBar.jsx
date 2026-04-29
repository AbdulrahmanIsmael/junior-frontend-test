import "./filterBar.css";

import { Search, X } from "lucide-react";
import { setPriority, setSearchQuery } from "../../redux/tasksSlice/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import { Fragment } from "react";

const FILTER_OPTIONS = [
  { label: "All", value: "all", id: "filter-all", checked: true },
  { label: "High", value: "high", id: "filter-high", checked: false },
  { label: "Medium", value: "medium", id: "filter-medium", checked: false },
  { label: "Low", value: "low", id: "filter-low", checked: false },
];

const FilterBar = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const dispatch = useDispatch();

  if (tasks.length === 0) return null;

  const onFilterChange = (event) => {
    dispatch(setPriority(event.target.value));
  };

  const onSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onClearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="filter-bar-wrapper">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={onSearchChange}
          id="task-search"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={onClearSearch}
            aria-label="Clear search"
            type="button"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <form className="filter-bar">
        {FILTER_OPTIONS.map((option) => (
          <Fragment key={option.id}>
            <input
              type="radio"
              name="filter-selection"
              id={option.id}
              value={option.value}
              defaultChecked={option.checked}
              onChange={onFilterChange}
            />
            <label className="filter-tab" htmlFor={option.id}>
              {option.label}
            </label>
          </Fragment>
        ))}
      </form>
    </div>
  );
};

export default FilterBar;
