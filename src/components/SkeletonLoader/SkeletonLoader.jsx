import './SkeletonLoader.css';

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton skeleton--sm" />
          <div className="skeleton skeleton--lg" />
          <div className="skeleton skeleton--md" />
          <div className="skeleton skeleton--sm" />
          <div className="skeleton skeleton--sm" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard({ count = 4 }) {
  return (
    <div className="skeleton-cards">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card-item">
          <div className="skeleton-card-item__header">
            <div className="skeleton skeleton--icon" />
            <div className="skeleton skeleton--md" />
          </div>
          <div className="skeleton skeleton--full" style={{ marginTop: 16 }} />
          <div className="skeleton skeleton--bar" style={{ marginTop: 12 }} />
          <div className="skeleton skeleton--sm" style={{ marginTop: 8 }} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStat({ count = 4 }) {
  return (
    <div className="skeleton-stats">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-stat-item">
          <div className="skeleton skeleton--sm" />
          <div className="skeleton skeleton--xl" style={{ marginTop: 8 }} />
          <div className="skeleton skeleton--md" style={{ marginTop: 8 }} />
        </div>
      ))}
    </div>
  );
}
