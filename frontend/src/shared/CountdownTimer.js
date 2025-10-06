import React, { useEffect, useState } from 'react';
import './shared.css';

function getTimeParts(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { days, hours, minutes, secs };
}

export default function CountdownTimer({ targetDate, compact }) {
  const [parts, setParts] = useState(getTimeParts(targetDate));
  useEffect(() => {
    const t = setInterval(() => setParts(getTimeParts(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  if (compact) {
    return (
      <div className="countdown compact">
        <span>{parts.days}d</span>
        <span>{String(parts.hours).padStart(2, '0')}h</span>
        <span>{String(parts.minutes).padStart(2, '0')}m</span>
        <span>{String(parts.secs).padStart(2, '0')}s</span>
      </div>
    );
  }

  const Item = ({ label, value }) => (
    <div className="count-item">
      <div className="value">{String(value).padStart(2, '0')}</div>
      <div className="label">{label}</div>
    </div>
  );

  return (
    <div className="countdown">
      <Item label="Days" value={parts.days} />
      <Item label="Hours" value={parts.hours} />
      <Item label="Minutes" value={parts.minutes} />
      <Item label="Seconds" value={parts.secs} />
    </div>
  );
}


