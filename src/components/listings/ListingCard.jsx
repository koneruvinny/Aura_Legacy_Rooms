import React, { useState } from 'react';
import { Heart, Star, Camera, MapPin } from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────
const getRatingLabel = rating => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  return 'Average';
};

const getRatingColor = rating => {
  if (rating >= 4.5) return '#059669';
  if (rating >= 4.0) return '#0d9488';
  if (rating >= 3.5) return '#d97706';
  return '#dc2626';
};

// ── Component ─────────────────────────────────────────────────────────────────
const ListingCard = ({ property }) => {
  const [wishlisted, setWishlisted] = useState(property.isWishlisted ?? false);

  return (
    <article className="listing-card">

      {/* ── Left: Image panel ── */}
      <div className="lc-image-panel">
        <img
          src={property.imageUrls?.[0]
            ?? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'}
          alt={property.title}
          className="lc-img"
        />

        {/* Wishlist btn */}
        <button
          className={`lc-wishlist-btn${wishlisted ? ' lc-wishlist-btn--active' : ''}`}
          onClick={() => setWishlisted(w => !w)}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={17}
            fill={wishlisted ? '#ef4444' : 'none'}
            color={wishlisted ? '#ef4444' : 'white'}
          />
        </button>

        {/* Deal badge */}
        {property.deals?.map(deal => (
          <span key={deal} className="lc-deal-badge">{deal}</span>
        ))}

        {/* Photo count */}
        <div className="lc-photo-bar">
          <Camera size={12} />
          <span>{property.photoCount} Photos &amp; Videos →</span>
        </div>
      </div>

      {/* ── Middle: Content ── */}
      <div className="lc-body">
        <div className="lc-name-row">
          <h3 className="lc-name">{property.title}</h3>
          <div className="lc-stars" aria-label={`${property.stars} stars`}>
            {Array.from({ length: property.stars ?? 3 }).map((_, i) => (
              <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" strokeWidth={0} />
            ))}
          </div>
        </div>

        <p className="lc-location">
          <span className="lc-area">
            <MapPin size={12} /> {property.location}
          </span>
          <span className="lc-distance"> | {property.distance}</span>
        </p>

        <div className="lc-tags-row">
          {property.tags?.map(tag => (
            <span key={tag} className="lc-tag">{tag}</span>
          ))}
        </div>

        <ul className="lc-highlights-list">
          {property.highlights?.slice(0, 2).map((h, i) => (
            <li key={i} className="lc-highlight-item">
              <span className="lc-bullet">✦</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right: Price panel ── */}
      <div className="lc-price-panel">
        <div className="lc-rating-wrap">
          <span className="lc-rating-text">{getRatingLabel(property.rating)}</span>
          <div
            className="lc-rating-badge"
            style={{ background: getRatingColor(property.rating) }}
          >
            {property.rating}
          </div>
        </div>
        <p className="lc-rating-count">
          ({property.ratingCount?.toLocaleString('en-IN')} Ratings)
        </p>

        <div className="lc-price-block">
          <span className="lc-original-price">
            ₹{property.originalPrice?.toLocaleString('en-IN')}
          </span>
          <div className="lc-price-main">
            <span className="lc-currency">₹</span>
            <span className="lc-amount">
              {property.price?.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="lc-taxes">+ ₹{property.taxes} taxes &amp; fees</p>
          <p className="lc-per-night">Per Month</p>
        </div>

        <a href="#" className="lc-book-link" onClick={e => e.preventDefault()}>
          Login to Book Now &amp; Pay Later!
        </a>
      </div>

    </article>
  );
};

export default ListingCard;
