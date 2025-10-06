import React, { useState } from 'react';
import './shared.css';
import SideMenu from './SideMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
      setMenuOpen(true);
      return;
    }
    document.body.classList.toggle('hide-cat-menu');
  };
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="icon-btn" aria-label="menu" onClick={handleMenuClick}>☰</button>
        <div className="brand">Exclusive</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <a href="#signup">Sign Up</a>
        </nav>
        <div className="actions">
          <input className="search" placeholder="What are you looking for?" />
          <button className="icon-btn" aria-label="wishlist">♡</button>
          <button className="icon-btn" aria-label="cart">🛒</button>
          <button className="icon-btn" aria-label="user">👤</button>
        </div>
      </div>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}


