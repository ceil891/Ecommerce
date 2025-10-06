import React from 'react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import HeroCarousel from '../shared/HeroCarousel';
import CategoryMenu from '../shared/CategoryMenu';
import SectionHeader from '../shared/SectionHeader';
import CountdownTimer from '../shared/CountdownTimer';
import ProductCard from '../shared/ProductCard';
import { flashSaleProducts, newArrivalProducts, bestSellingProducts, exploreProducts } from '../sample-data/products';
import '../styles/home.css';
import '../shared/shared.css';

function ProductGrid({ products }) {
  return (
    <div className="grid grid-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
}

export default function Home() {
  const flashSaleEnd = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000); // 4 days from now

  return (
    <div className="page">
      <Header />

      <main className="container">
        <div className="hero-row">
          <CategoryMenu />
          <HeroCarousel />
        </div>

        <section className="section">
          <SectionHeader eyebrow="Today's" title="Flash Sales" />
          <div className="flash-meta">
            <CountdownTimer targetDate={flashSaleEnd} />
            <div className="controls">
              <button className="btn circle" aria-label="prev">‹</button>
              <button className="btn circle" aria-label="next">›</button>
            </div>
          </div>
          <ProductGrid products={flashSaleProducts} />
        </section>

        <hr className="divider" />

        <section className="section">
          <SectionHeader eyebrow="Featured" title="New Arrival" ctaText="View All Products" />
          <div className="arrival-grid">
            <div className="arrival-large card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1606813907291-76b3a88f8313?q=80&w=1400&auto=format&fit=crop)'}}>
              <div className="overlay">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <button className="btn">Shop Now</button>
              </div>
            </div>
            <div className="arrival-subgrid">
              <div className="arrival-sub card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1520975922284-9a5f5cbe2a0a?q=80&w=900&auto=format&fit=crop)'}}>
                <div className="overlay">
                  <h3>Women’s Collections</h3>
                  <p>Featured women's collections that give you another vibe.</p>
                  <button className="btn">Shop Now</button>
                </div>
              </div>
              <div className="arrival-tiles">
                <div className="arrival-sub card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=900&auto=format&fit=crop)'}}>
                  <div className="overlay">
                    <h3>Speakers</h3>
                    <button className="btn subtle">Shop Now</button>
                  </div>
                </div>
                <div className="arrival-sub card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=900&auto=format&fit=crop)'}}>
                  <div className="overlay">
                    <h3>Perfume</h3>
                    <button className="btn subtle">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow="This Month" title="Best Selling Products" ctaText="View All" />
          <ProductGrid products={bestSellingProducts} />
        </section>

        <section className="section">
          <div className="music-banner">
            <div className="content">
              <p className="eyebrow green">Categories</p>
              <h2>Enhance Your Music Experience</h2>
              <CountdownTimer targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} compact />
              <button className="btn">Buy Now!</button>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow="Our Products" title="Explore Our Products" ctaText="View All Products" />
          <ProductGrid products={exploreProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}


