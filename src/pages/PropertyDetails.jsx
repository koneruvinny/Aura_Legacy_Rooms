import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Check, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import '../css/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Failed to fetch property details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem('aura_user'));
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/bookings', {
        propertyId: id,
        userId: user.id,
        checkInDate: new Date().toISOString().split('T')[0],
        checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // +1 day
        totalAmount: property.price
      });
      setBookingStatus('Booking Confirmed!');
    } catch (error) {
      setBookingStatus('Failed to create booking.');
    }
  };

  if (loading) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Loading...</div>;
  if (!property) return <div className="container" style={{padding: '5rem 0', textAlign: 'center'}}>Property not found.</div>;

  return (
    <div className="property-details-page container">
      <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="property-header">
        <h1 className="property-title">{property.title}</h1>
        <div className="property-meta">
          <div className="meta-item rating">
            <Star size={18} fill="#F59E0B" color="#F59E0B" /> {property.rating}
          </div>
          <div className="meta-item">
            <MapPin size={18} /> {property.location}
          </div>
          <div className="meta-badge">{property.type}</div>
        </div>
      </div>

      <div className="property-gallery">
        <img 
          src={property.imageUrls?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'} 
          alt={property.title} 
          className="main-image"
        />
      </div>

      <div className="property-content-grid">
        <div className="property-info">
          <section className="info-section">
            <h2>About this place</h2>
            <p>{property.description}</p>
          </section>

          <section className="info-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <Check size={18} className="text-primary" /> {amenity}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="property-sidebar">
          <div className="booking-card glass-panel">
            <div className="booking-price">
              <span className="price-bold">${property.price}</span>
              <span className="price-period">{property.type === 'HOTEL' ? '/night' : '/month'}</span>
            </div>
            
            <button 
              className="btn btn-primary full-width booking-btn"
              onClick={handleBook}
              disabled={bookingStatus !== ''}
            >
              {bookingStatus || 'Book Now'}
            </button>
            
            <p className="booking-note">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
