import React from 'react';
import { COLLECTIONS } from '../../data/mockData';

const CollectionsRow = () => (
  <section className="collections-section">
    <div className="collections-header">
      <span className="collections-sparkle">✦</span>
      <h3 className="collections-title">COLLECTIONS</h3>
      <span className="collections-sparkle">✦</span>
    </div>
    <p className="collections-subtitle">Curated picks for every lifestyle and budget</p>

    <div className="collections-grid">
      {COLLECTIONS.map(col => (
        <button key={col.id} className="collection-item" id={`collection-${col.id}`}>
          <div className="collection-img-ring">
            <img src={col.image} alt={col.name} className="collection-img" />
          </div>
          <h4 className="collection-name">{col.name}</h4>
          <p className="collection-desc">{col.description}</p>
        </button>
      ))}
    </div>
  </section>
);

export default CollectionsRow;
