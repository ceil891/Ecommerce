import React from 'react';
import './shared.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Exclusive</h3>
          <p className="muted">Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="subscribe">
            <input placeholder="Enter your email" />
            <button className="icon-btn">→</button>
          </div>
        </div>
        <div>
          <h4>Support</h4>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div>
          <h4>Quick Link</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4>Download App</h4>
          <p className="muted">Save $3 with App New User Only</p>
          <div className="store-badges">
            <div className="badge">Google Play</div>
            <div className="badge">App Store</div>
          </div>
          <div className="socials">
            <a href="#">f</a>
            <a href="#">t</a>
            <a href="#">i</a>
            <a href="#">in</a>
          </div>
        </div>
      </div>
      <div className="copy">© Copyright Rimel 2022. All right reserved</div>
    </footer>
  );
}


