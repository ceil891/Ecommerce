import React, { useState, useEffect } from 'react';
import './shared.css';

const slides = [
  {
    id: 1,
    title: 'Up to 10% off Voucher',
    subtitle: 'iPhone 14 Series',
    image: 'https://images.unsplash.com/photo-1670272507985-1a5cd1a55cb7?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Discover New Arrivals',
    subtitle: 'Smart Gadgets',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Game On',
    subtitle: 'Best Gaming Deals',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  return (
    <section className="hero">
      <div className="hero-card" style={{ backgroundImage: `url(${slide.image})` }}>
        <div className="hero-content">
          <p className="eyebrow">{slide.subtitle}</p>
          <h1>{slide.title}</h1>
          <button className="btn">Shop Now</button>
        </div>
        <div className="dots">
          {slides.map((s, i) => (
            <button key={s.id} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}


