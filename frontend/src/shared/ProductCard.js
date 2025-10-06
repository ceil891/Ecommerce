import React from 'react';
import './shared.css';

const fallbackImg = 'https://picsum.photos/seed/product-placeholder/600/600';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="thumb">
        {product.badge && <span className={`badge ${product.badgeColor || ''}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = fallbackImg; }} />
        <div className="hover-actions">
          <button className="btn block">Add To Cart</button>
        </div>
      </div>
      <div className="info">
        <h4 className="name">{product.name}</h4>
        <div className="price-row">
          <span className="price">${product.price}</span>
          {product.compareAt && <span className="compare">${product.compareAt}</span>}
        </div>
        {product.rating && (
          <div className="rating">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span className="muted">({product.reviews || 0})</span>
          </div>
        )}
      </div>
    </div>
  );
}


