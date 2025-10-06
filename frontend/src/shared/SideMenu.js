import React from 'react';
import './shared.css';

export default function SideMenu({ open, onClose }) {
  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`side-menu ${open ? 'open' : ''}`}>
        <div className="side-header">
          <strong>Categories</strong>
          <button className="icon-btn" onClick={onClose} aria-label="close">✕</button>
        </div>
        <nav className="side-nav">
          <a href="#">Woman's Fashion</a>
          <a href="#">Men's Fashion</a>
          <a href="#">Electronics</a>
          <a href="#">Home & Lifestyle</a>
          <a href="#">Medicine</a>
          <a href="#">Sports & Outdoor</a>
          <a href="#">Baby's & Toys</a>
          <a href="#">Groceries & Pets</a>
          <a href="#">Health & Beauty</a>
        </nav>
      </aside>
    </>
  );
}



