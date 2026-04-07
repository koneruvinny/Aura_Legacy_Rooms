import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const SORT_OPTIONS = [
  { id: 'popularity',  label: 'Popularity' },
  { id: 'price_asc',  label: 'Price (Low to High)' },
  { id: 'price_desc', label: 'Price (High to Low)' },
  { id: 'rating',     label: 'User Rating (Highest)' },
  { id: 'best',       label: 'Lowest Price & Best Rated' },
];

const SortBar = ({ activeSort, onSortChange }) => (
  <div className="sort-bar">
    <button className="sort-arrow" aria-label="Scroll left">
      <ChevronLeft size={16} />
    </button>

    <div className="sort-options-row">
      {SORT_OPTIONS.map(opt => (
        <button
          key={opt.id}
          id={`sort-${opt.id}`}
          className={`sort-opt ${activeSort === opt.id ? 'sort-opt--active' : ''}`}
          onClick={() => onSortChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>

    <button className="sort-arrow" aria-label="Scroll right">
      <ChevronRight size={16} />
    </button>
  </div>
);

SortBar.propTypes = {
  activeSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBar;
