import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';

// ── Static filter options ─────────────────────────────────────────────────────
const SUGGESTED = [
  { id: 'rush_deal',    label: 'Rush Deal',          count: 443 },
  { id: 'last_minute', label: 'Last Minute Deals',   count: 120 },
  { id: 'five_star',   label: '5 Star',              count: 27  },
  { id: 'four_star',   label: '4 Star',              count: 74  },
  { id: 'breakfast',   label: 'Breakfast Included',  count: 240 },
  { id: 'three_star',  label: '3 Star',              count: 193 },
];

const PRICE_RANGES = [
  { id: 'p1', label: '₹0 – ₹4,000',       count: 314 },
  { id: 'p2', label: '₹4,000 – ₹8,000',   count: 71  },
  { id: 'p3', label: '₹8,000 – ₹12,000',  count: 27  },
  { id: 'p4', label: '₹12,000 – ₹15,000', count: 9   },
  { id: 'p5', label: '₹15,000 – ₹30,000', count: 20  },
  { id: 'p6', label: '₹30,000+',           count: 2   },
];

const STAR_CATS = [
  { id: 's3', label: '3 Star', count: 193 },
  { id: 's4', label: '4 Star', count: 74  },
  { id: 's5', label: '5 Star', count: 27  },
];

const PROP_TYPES = [
  { id: 'pg',        label: 'PG',        count: 179 },
  { id: 'room',      label: 'Room',      count: 101 },
  { id: 'studio',    label: 'Studio',    count: 54  },
  { id: 'coliving',  label: 'Co-living', count: 50  },
  { id: 'apartment', label: 'Apartment', count: 22  },
];

// ── Reusable checkbox section ─────────────────────────────────────────────────
const FilterSection = ({ title, items, selected, onChange, showMoreAfter }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = showMoreAfter && !expanded ? items.slice(0, showMoreAfter) : items;
  const extra   = showMoreAfter ? items.length - showMoreAfter : 0;

  return (
    <div className="fsb-section">
      <h4 className="fsb-section-title">{title}</h4>
      <ul className="fsb-list">
        {visible.map(item => (
          <li key={item.id}>
            <label className="fsb-check-label">
              <input
                type="checkbox"
                className="fsb-checkbox"
                checked={selected.includes(item.id)}
                onChange={() => onChange(item.id)}
              />
              <span className="fsb-check-text">{item.label}</span>
              <span className="fsb-count">({item.count})</span>
            </label>
          </li>
        ))}
      </ul>
      {extra > 0 && (
        <button className="fsb-show-more" onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Show less' : `Show ${extra} more`}
        </button>
      )}
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const toggle = (arr, id) =>
  arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

// ── Main component ────────────────────────────────────────────────────────────
const FilterSidebar = () => {
  const [search,   setSearch]   = useState('');
  const [suggest,  setSuggest]  = useState(['rush_deal']);
  const [prices,   setPrices]   = useState([]);
  const [stars,    setStars]    = useState([]);
  const [types,    setTypes]    = useState([]);

  const applied = SUGGESTED.filter(f => suggest.includes(f.id));

  const clearAll = () => {
    setSuggest([]);
    setPrices([]);
    setStars([]);
    setTypes([]);
  };

  return (
    <aside className="filter-sidebar">

      {/* ── Map preview box ── */}
      <div className="fsb-map-box">
        <div className="fsb-map-bg">
          <div className="fsb-map-grid" />
          <div className="fsb-map-pin"><MapPin size={20} color="#e11d48" fill="#e11d48" /></div>
        </div>
        <button className="fsb-map-btn">
          <MapPin size={13} /> EXPLORE ON MAP
        </button>
      </div>

      {/* ── Search ── */}
      <div className="fsb-search-wrap">
        <Search size={14} className="fsb-search-icon" />
        <input
          id="fsb-search"
          className="fsb-search-input"
          placeholder="Search filters…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── Applied filters ── */}
      {applied.length > 0 && (
        <div className="fsb-section">
          <div className="fsb-section-head">
            <h4 className="fsb-section-title">Applied Filters</h4>
            <button className="fsb-clear-btn" onClick={clearAll}>CLEAR</button>
          </div>
          <div className="fsb-chips">
            {applied.map(f => (
              <span key={f.id} className="fsb-chip">
                {f.label}
                <button
                  className="fsb-chip-remove"
                  onClick={() => setSuggest(s => toggle(s, f.id))}
                  aria-label={`Remove ${f.label}`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <FilterSection
        title="Suggested For You"
        items={SUGGESTED}
        selected={suggest}
        onChange={id => setSuggest(s => toggle(s, id))}
      />

      <FilterSection
        title="Price Per Month"
        items={PRICE_RANGES}
        selected={prices}
        onChange={id => setPrices(p => toggle(p, id))}
      />

      <FilterSection
        title="Star Category"
        items={STAR_CATS}
        selected={stars}
        onChange={id => setStars(s => toggle(s, id))}
      />

      <FilterSection
        title="Property Type"
        items={PROP_TYPES}
        selected={types}
        onChange={id => setTypes(t => toggle(t, id))}
        showMoreAfter={3}
      />

    </aside>
  );
};

export default FilterSidebar;
