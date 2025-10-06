import React from 'react';
import './shared.css';

export default function SectionHeader({ eyebrow, title, ctaText }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && (
          <div className="eyebrow-row">
            <span className="dot red" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h2>{title}</h2>
      </div>
      {ctaText && <button className="btn outline small">{ctaText}</button>}
    </div>
  );
}


