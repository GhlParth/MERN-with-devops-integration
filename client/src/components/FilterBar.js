import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './FilterBar.css';

function FilterBar({ filters, onFilterChange }) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handlePriorityChange = (priority) => {
    onFilterChange({ ...filters, priority });
  };

  const handleSearchChange = (search) => {
    setLocalSearch(search);
    onFilterChange({ ...filters, search });
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    onFilterChange({ ...filters, search: '' });
  };

  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />
        {localSearch && (
          <button 
            className="clear-search"
            onClick={handleClearSearch}
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="filter-group">
        <div className="filter-category">
          <span className="category-label">Status:</span>
          <div className="filter-buttons">
            {['all', 'active', 'completed'].map(status => (
              <button
                key={status}
                className={`filter-btn ${filters.status === status ? 'active' : ''}`}
                onClick={() => handleStatusChange(status)}
              >
                {status === 'all' && '📋 All'}
                {status === 'active' && '⏳ Active'}
                {status === 'completed' && '✅ Completed'}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-category">
          <span className="category-label">Priority:</span>
          <div className="filter-buttons">
            {['all', 'low', 'medium', 'high'].map(priority => (
              <button
                key={priority}
                className={`filter-btn ${filters.priority === priority ? 'active' : ''}`}
                onClick={() => handlePriorityChange(priority)}
              >
                {priority === 'all' && 'All'}
                {priority === 'low' && '🟢 Low'}
                {priority === 'medium' && '🟡 Medium'}
                {priority === 'high' && '🔴 High'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
