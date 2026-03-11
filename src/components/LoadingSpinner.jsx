export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = { sm: 24, md: 40, lg: 60 };
  const dim = sizes[size] || sizes.md;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3 animate-fade-in">
      <div
        className="spinner-border"
        role="status"
        style={{
          width: dim,
          height: dim,
          color: 'var(--ww-primary)',
          borderWidth: size === 'sm' ? 2 : 3,
        }}
      >
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <span style={{ color: 'var(--ww-text-muted)', fontSize: '0.875rem' }}>{text}</span>}
    </div>
  );
}
