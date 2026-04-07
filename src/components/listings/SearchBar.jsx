import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Clock, Flame, X, ArrowUpRight } from 'lucide-react';

// ── Static suggestion data ────────────────────────────────────────────────────
const RECENT_SEARCHES = [
  { id: 'r1', city: 'Gachibowli, Hyderabad', meta: '₹9,000/mo · Boys PG · 1 Sharing' },
  { id: 'r2', city: 'HSR Layout, Bangalore',  meta: '₹7,500/mo · Girls PG · 2 Sharing' },
  { id: 'r3', city: 'Baner, Pune',            meta: '₹6,000/mo · Co-living · Studio'   },
];

const TRENDING_CITIES = [
  { id: 't1', city: 'Bangalore',  state: 'Karnataka',    icon: '🌆' },
  { id: 't2', city: 'Hyderabad', state: 'Telangana',    icon: '🏙️' },
  { id: 't3', city: 'Pune',      state: 'Maharashtra',  icon: '🌇' },
  { id: 't4', city: 'Mumbai',    state: 'Maharashtra',  icon: '🌃' },
  { id: 't5', city: 'Chennai',   state: 'Tamil Nadu',   icon: '🌉' },
  { id: 't6', city: 'Delhi',     state: 'Delhi NCR',    icon: '🏛️' },
];

// ── Component ─────────────────────────────────────────────────────────────────
const SearchBar = ({ location = '', onSearch }) => {
  const [query,      setQuery]      = useState(location || 'Gachibowli, Hyderabad');
  const [dropOpen,   setDropOpen]   = useState(false);
  const [dropQuery,  setDropQuery]  = useState('');
  const [checkIn,    setCheckIn]    = useState('');
  const [checkOut,   setCheckOut]   = useState('');
  const [guests,     setGuests]     = useState('1 Room, 2 Adults');

  const wrapRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pickSuggestion = value => {
    setQuery(value);
    setDropOpen(false);
    setDropQuery('');
  };

  const handleSearch = () => {
    setDropOpen(false);
    onSearch?.({ query, checkIn, checkOut, guests });
  };

  // Filter trending based on dropQuery
  const filteredTrending = dropQuery.trim()
    ? TRENDING_CITIES.filter(c =>
        c.city.toLowerCase().includes(dropQuery.toLowerCase()) ||
        c.state.toLowerCase().includes(dropQuery.toLowerCase()))
    : TRENDING_CITIES;

  const filteredRecent = dropQuery.trim()
    ? RECENT_SEARCHES.filter(r =>
        r.city.toLowerCase().includes(dropQuery.toLowerCase()))
    : RECENT_SEARCHES;

  return (
    <div className="lsb-root">
      <div className="lsb-inner">

        {/* ── Location field with dropdown ── */}
        <div
          className={`lsb-field lsb-field--location${dropOpen ? ' lsb-field--open' : ''}`}
          ref={wrapRef}
        >
          <span className="lsb-label"><MapPin size={11} /> CITY, AREA OR PROPERTY</span>
          <input
            id="lsb-location"
            className="lsb-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setDropOpen(true)}
            placeholder="Where do you want to stay?"
            autoComplete="off"
          />

          {/* ── Dropdown panel ── */}
          {dropOpen && (
            <div className="lsb-dropdown">
              {/* Accent bar */}
              <div className="lsb-drop-accent" />

              {/* Inner search */}
              <div className="lsb-drop-search-row">
                <Search size={15} className="lsb-drop-search-icon" />
                <input
                  className="lsb-drop-search-input"
                  placeholder="Search city, area or PG name…"
                  value={dropQuery}
                  onChange={e => setDropQuery(e.target.value)}
                  autoFocus
                />
                {dropQuery && (
                  <button className="lsb-drop-clear" onClick={() => setDropQuery('')}>
                    <X size={13} /> CLEAR
                  </button>
                )}
              </div>

              {/* Inline search suggestion */}
              {dropQuery && (
                <button
                  className="lsb-drop-inline-search"
                  onClick={() => pickSuggestion(dropQuery)}
                >
                  <Search size={14} />
                  <span>Search: <strong>"{dropQuery}"</strong></span>
                  <ArrowUpRight size={14} className="lsb-drop-goto" />
                </button>
              )}

              {/* Recent searches */}
              {filteredRecent.length > 0 && (
                <div className="lsb-drop-section">
                  <p className="lsb-drop-section-label">
                    <Clock size={12} /> RECENT VISITS
                  </p>
                  <ul className="lsb-drop-list">
                    {filteredRecent.map(r => (
                      <li key={r.id}>
                        <button
                          className="lsb-drop-item lsb-drop-item--recent"
                          onClick={() => pickSuggestion(r.city)}
                        >
                          <div className="lsb-drop-item-icon lsb-drop-item-icon--clock">
                            <Clock size={14} />
                          </div>
                          <div className="lsb-drop-item-text">
                            <span className="lsb-drop-city">{r.city}</span>
                            <span className="lsb-drop-meta">{r.meta}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trending cities */}
              {filteredTrending.length > 0 && (
                <div className="lsb-drop-section">
                  <p className="lsb-drop-section-label">
                    <Flame size={12} /> TRENDING LOCATIONS
                  </p>
                  <div className="lsb-drop-cities-grid">
                    {filteredTrending.map(c => (
                      <button
                        key={c.id}
                        className="lsb-drop-city-pill"
                        onClick={() => pickSuggestion(c.city)}
                      >
                        <span className="lsb-drop-city-emoji">{c.icon}</span>
                        <div>
                          <span className="lsb-drop-city-name">{c.city}</span>
                          <span className="lsb-drop-city-state">{c.state}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lsb-sep" />

        {/* Check-in */}
        <div className="lsb-field">
          <span className="lsb-label"><Calendar size={11} /> CHECK-IN</span>
          <input
            id="lsb-checkin"
            type="date"
            className="lsb-input"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
          />
        </div>

        <div className="lsb-sep" />

        {/* Check-out */}
        <div className="lsb-field">
          <span className="lsb-label"><Calendar size={11} /> CHECK-OUT</span>
          <input
            id="lsb-checkout"
            type="date"
            className="lsb-input"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
          />
        </div>

        <div className="lsb-sep" />

        {/* Guests */}
        <div className="lsb-field">
          <span className="lsb-label"><Users size={11} /> ROOMS &amp; GUESTS</span>
          <input
            id="lsb-guests"
            className="lsb-input"
            value={guests}
            onChange={e => setGuests(e.target.value)}
          />
        </div>

        <button id="lsb-search-btn" className="lsb-search-btn" onClick={handleSearch}>
          <Search size={18} /> SEARCH
        </button>

      </div>
    </div>
  );
};

export default SearchBar;
