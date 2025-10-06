import React from 'react';
import './shared.css';

const items = [
  "Woman's Fashion",
  "Men's Fashion",
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  "Baby's & Toys",
  'Groceries & Pets',
  'Health & Beauty',
];

export default function CategoryMenu() {
  return (
    <aside className="category-menu">
      {items.map((label) => (
        <a key={label} href="#" className="cat-item">
          <span>{label}</span>
          <span className="chev">›</span>
        </a>
      ))}
    </aside>
  );
}



