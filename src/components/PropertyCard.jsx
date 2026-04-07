import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import PropTypes from 'prop-types';
import '../css/PropertyCard.css';

const PropertyCard = ({ property }) => {
  const propertyId = property.id || property._id;
  
  return (
    <Link to={`/properties/${propertyId}`} className="property-card">
      <div className="card-image-wrapper">
        <img 
          src={property.imageUrls?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'} 
          alt={property.title} 
          className="card-image" 
        />
        <div className="card-type-badge">{property.type}</div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{property.title}</h3>
          {property.rating && (
            <div className="card-rating">
              <Star className="icon-star" size={14} fill="currentColor" />
              <span>{property.rating}</span>
            </div>
          )}
        </div>
        
        <div className="card-meta">
          <div className="card-location">
            <MapPin size={14} />
            <span>{property.area}, {property.state}</span>
          </div>
          <div className="card-badges-row">
            <div className="card-sharing-badge">
              {property.sharing} Sharing
            </div>
            <div className={`card-gender-badge ${property.forGender.toLowerCase()}`}>
              {property.forGender === 'Unisex' ? 'Co-living' : `${property.forGender} Only`}
            </div>
          </div>
        </div>

        <div className="card-footer-refined">
          <div className="card-price-refined">
            <span className="price-amount">₹{property.price}</span>
            <span className="price-period">/month</span>
          </div>
          <div className="card-layout-tag">{property.layout}</div>
        </div>
      </div>
    </Link>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    rating: PropTypes.number,
    area: PropTypes.string,
    state: PropTypes.string,
    sharing: PropTypes.bool,
    forGender: PropTypes.string,
    price: PropTypes.number,
    layout: PropTypes.string,
  }).isRequired,
};

export default PropertyCard;
