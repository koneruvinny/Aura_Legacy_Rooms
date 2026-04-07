import React, { useState, useMemo } from 'react';
import { ChevronRight, Compass } from 'lucide-react';

import SearchBar       from '../components/listings/SearchBar';
import FilterSidebar   from '../components/listings/FilterSidebar';
import ListingCard     from '../components/listings/ListingCard';
import SortBar         from '../components/listings/SortBar';
import CollectionsRow  from '../components/listings/CollectionsRow';

import { LISTING_PROPERTIES } from '../data/mockData';
import '../css/Listings.css';

// ─── Sort helper ──────────────────────────────────────────────────────────────
const sortProperties = (list, sortBy) => {
  const arr = [...list];
  switch (sortBy) {
    case 'price_asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price_desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating);
    case 'best':       return arr.sort((a, b) =>
      (b.rating / b.price) - (a.rating / a.price));
    default:           return arr; // 'popularity' — original order
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
const Listings = () => {
  const [sortBy,   setSortBy]   = useState('popularity');
  const [cityName, setCityName] = useState('Hyderabad');

  const displayed = useMemo(
    () => sortProperties(LISTING_PROPERTIES, sortBy),
    [sortBy]
  );

  const handleSearch = ({ query }) => {
    if (query?.trim()) setCityName(query.trim());
  };

  return (
    <div className="listings-page">

      {/* ── Sticky search bar ── */}
      <SearchBar location={cityName} onSearch={handleSearch} />

      <div className="listings-container">

        {/* ── Left: Filter sidebar ── */}
        <FilterSidebar />

        {/* ── Right: Results area ── */}
        <div className="listings-content">

          {/* Breadcrumb */}
          <nav className="listings-breadcrumb" aria-label="breadcrumb">
            <span>Home</span>
            <ChevronRight size={13} />
            <span>PGs &amp; Rooms</span>
            <ChevronRight size={13} />
            <span className="bc-active">in {cityName}</span>
          </nav>

          {/* Page title + tips */}
          <div className="listings-title-row">
            <h1 className="listings-heading">
              {displayed.length} Properties in {cityName}
            </h1>
            <button className="explore-tips-btn" id="explore-tips-btn">
              <Compass size={14} /> Explore Travel Tips →
            </button>
          </div>

          {/* Sort tabs */}
          <SortBar activeSort={sortBy} onSortChange={setSortBy} />

          {/* Results subtitle */}
          <p className="listings-showing">Showing Properties in {cityName}</p>

          {/* Cards */}
          <div className="listing-cards-list">
            {displayed.length > 0 ? (
              displayed.map(property => (
                <ListingCard key={property.id} property={property} />
              ))
            ) : (
              <div className="no-results">
                <p>No properties found. Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Collections */}
          <CollectionsRow />

        </div>
      </div>
    </div>
  );
};

export default Listings;
