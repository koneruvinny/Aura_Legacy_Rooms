import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, Star, ArrowLeft, ArrowRight, MapPin, Headphones, Shield, Tag, Send, Users } from 'lucide-react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { MOCK_PROPERTIES, AREA_ATTRACTIONS } from '../data/mockData';
import '../css/Home.css';

const REVIEWS = [
  {
    id: 1,
    image: "https://media.istockphoto.com/id/1256296335/photo/a-romantic-couple-on-summer-vacation-enjos-the-sunset-over-the-mediterranean-sea-by-the-pool.jpg?s=612x612&w=0&k=20&c=FJurmc0CUMEpoAdRIUfJ2rHIOM-gYs-V5MM_0PoOJtQ=",
    date: "December 2021",
    heading: "Diam sit molestie at elementum eu",
    text: "Consequat interdum varius sit amet mattis vulputate enim nulla. Posuere morbi leo urna molestie at elementum eu facilisis sed.",
    author: "Kate Walker"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000",
    date: "March 2023",
    heading: "An unforgettable premium experience",
    text: "The level of detail and service provided was absolutely spectacular. I've travelled globally and this stays at the top of my list.",
    author: "Michael Chen"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000",
    date: "January 2024",
    heading: "Perfect location and stunning views",
    text: "Waking up to that view every morning completely made our trip. Everything was pristine, seamless, and perfectly managed.",
    author: "Sarah Jenkins"
  }
];

const STATES_DATA = {
  "Maharashtra": ["Baner", "Hinjewadi", "Kothrud"],
  "Karnataka": ["HSR Layout", "Indiranagar", "Koramangala"],
  "Telangana": ["Gachibowli", "Madhapur", "Kondapur"]
};

const GENDERS = ["Boys", "Girls", "Unisex"];
const LAYOUTS = ["Single Room", "Room", "Studio", "Shared Room"];
const SHARING_OPTIONS = ["1 Sharing", "2 Sharing", "3 Sharing"];

const Home = () => {
  const [allProperties, setAllProperties] = useState(MOCK_PROPERTIES);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Search States
  const [selectedState, setSelectedState] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSharing, setSelectedSharing] = useState("");

  const activeReview = REVIEWS[currentReviewIndex];
  const currentAttractions = selectedArea ? AREA_ATTRACTIONS[selectedArea] : null;

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Automatic Filtering Logic
  useEffect(() => {
    let filtered = [...MOCK_PROPERTIES];

    if (selectedState) {
      filtered = filtered.filter(p => p.state === selectedState);
    }
    if (selectedArea) {
      filtered = filtered.filter(p => p.area === selectedArea);
    }
    if (selectedLayout) {
      filtered = filtered.filter(p => p.layout === selectedLayout);
    }
    if (selectedGender) {
      filtered = filtered.filter(p => p.forGender === selectedGender);
    }
    if (selectedSharing) {
      // Logic for sharing (extract number from string)
      const sharingNum = parseInt(selectedSharing.split(" ")[0]);
      filtered = filtered.filter(p => p.sharing === sharingNum);
    }

    setFeaturedProperties(filtered.slice(0, 12));
  }, [selectedState, selectedArea, selectedLayout, selectedGender, selectedSharing]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedArea(""); // Reset area when state changes
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">
            Find Your Ideal <br />
            <span className="hero-highlight">PG Aura</span>
          </h1>
          <p className="hero-subtitle">
            Curated co-living spaces and PGs designed for modern professionals and students.
          </p>

          <div className="hero-search-refined glass-panel">
            {/* Custom Styled Selects */}
            <div className="search-group">
              <label><MapPin size={12} /> State</label>
              <select className="custom-select" value={selectedState} onChange={handleStateChange}>
                <option value="">Select State</option>
                {Object.keys(STATES_DATA).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="search-group">
              <label><Compass size={12} /> Area</label>
              <select className="custom-select" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} disabled={!selectedState}>
                <option value="">Select Area</option>
                {selectedState && STATES_DATA[selectedState].map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="search-group">
              <label><Star size={12} /> Layout</label>
              <select className="custom-select" value={selectedLayout} onChange={(e) => setSelectedLayout(e.target.value)}>
                <option value="">Select Layout</option>
                {LAYOUTS.map(layout => (
                  <option key={layout} value={layout}>{layout}</option>
                ))}
              </select>
            </div>

            <div className="search-group">
              <label><Users size={12} /> Gender</label>
              <select className="custom-select" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                <option value="">Category</option>
                {GENDERS.map(gender => (
                  <option key={gender} value={gender}>{gender === "Unisex" ? "Co-living" : gender}</option>
                ))}
              </select>
            </div>

            <div className="search-group">
              <label><Headphones size={12} /> Sharing</label>
              <select className="custom-select" value={selectedSharing} onChange={(e) => setSelectedSharing(e.target.value)}>
                <option value="">Persons</option>
                {SHARING_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary search-btn-refined">
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="hero-glow"></div>
      </section>

      {/* Top PG Locations */}
      <section className="destinations-section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Hot PG Localities</h2>
            <p className="section-subtitle">Discover comfortable stays in India's top tech hubs.</p>
          </div>
        </div>
        <div className="destinations-grid">
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1596760405808-166262b083bc?q=80&w=600" alt="Bangalore" />
            <div className="dest-overlay">
              <h3>Bangalore</h3>
              <p>HSR, Indiranagar, Koramangala</p>
            </div>
          </div>
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1572445271230-a78b5944a659?q=80&w=600" alt="Hyderabad" />
            <div className="dest-overlay">
              <h3>Hyderabad</h3>
              <p>Gachibowli, Madhapur, Kondapur</p>
            </div>
          </div>
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1570129476815-ba368ac77013?w=600&q=80" alt="Pune" />
            <div className="dest-overlay">
              <h3>Pune</h3>
              <p>Baner, Hinjewadi, Viman Nagar</p>
            </div>
          </div>
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1587330272325-fa210418ad2e?q=80&w=600" alt="Delhi" />
            <div className="dest-overlay">
              <h3>Delhi</h3>
              <p>North Campus, Karol Bagh, Laxmi Nagar</p>
            </div>
          </div>
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=600" alt="Mumbai" />
            <div className="dest-overlay">
              <h3>Mumbai</h3>
              <p>Andheri, Bandra, Powai</p>
            </div>
          </div>
          <div className="dest-card">
            <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600" alt="Chennai" />
            <div className="dest-overlay">
              <h3>Chennai</h3>
              <p>Adyar, T.Nagar, OMR</p>
            </div>
          </div>
        </div>
      </section>



      {/* Nearest Interesting Locations - Dynamic Section */}
      {currentAttractions && (
        <section className="attractions-section container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Nearest Interesting Locations</h2>
              <p className="section-subtitle">Discover top-rated temples, restaurants, lakes, and gaming zones in {selectedArea}.</p>
            </div>
          </div>
          <div className="attractions-grid">
            {currentAttractions.map((place) => (
              <div key={place.id} className="attraction-card-overlay">
                <img src={place.image} alt={place.name} className="attraction-img-full" />
                <div className="attraction-type-badge-alt">{place.type}</div>
                <div className="attraction-overlay-content">
                  <div className="attraction-text-group">
                    <h4 className="attraction-name-alt">{place.name}</h4>
                    <p className="attraction-dist-alt"><MapPin size={12} /> {place.distance}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + selectedArea)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-map-link"
                    title="Open in Google Maps"
                  >
                    <Compass size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* Featured Properties */}
      <section className="featured-section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Newest Listings</h2>
            <p className="section-subtitle">Premium co-living spaces and rooms for your next move.</p>
          </div>
          <div className="section-nav">
            <Link to="/listings?type=PG" className="nav-link">PG</Link>
            <Link to="/listings?type=Room" className="nav-link">Rooms</Link>
            <Link to="/listings" className="btn btn-outline btn-view-all">
              View All <Compass size={18} />
            </Link>
          </div>
        </div>

        <div className="properties-grid">
          {featuredProperties.length > 0 ? (
            featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="no-results container">
              <p>No PG matching those filters yet. Try widening your search.</p>
            </div>
          )}
        </div>
      </section>



      {/* Reviews Section */}
      <section className="reviews-section container">
        <div className="reviews-grid">
          <div className="reviews-image">
            <img
              src={activeReview.image}
              alt={`Review by ${activeReview.author}`}
            />
          </div>
          <div className="reviews-content">
            <h2 className="reviews-title">What our guests say</h2>
            <div className="review-card">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#FCD34D" color="#FCD34D" strokeWidth={1} />)}
              </div>
              <p className="review-date"><strong>Date of stay:</strong> {activeReview.date}</p>
              <h3 className="review-heading">{activeReview.heading}</h3>
              <p className="review-text">
                {activeReview.text}
              </p>
              <p className="review-author">{activeReview.author}</p>
            </div>
            <div className="review-controls">
              <button className="control-btn" onClick={handlePrevReview}><ArrowLeft size={20} /></button>
              <button className="control-btn" onClick={handleNextReview}><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section container">
        <div className="newsletter-box">
          <h2>Get Special Offers</h2>
          <p>Subscribe to our newsletter to receive exclusive deals and travel inspiration.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary"><Send size={18} /> Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
