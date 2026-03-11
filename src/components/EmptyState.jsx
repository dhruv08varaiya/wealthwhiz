export default function EmptyState({ icon = '📭', title, description, actionLabel, onAction }) {
  return (
    <div className="text-center py-5 animate-fade-in">
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{icon}</div>
      <h5 style={{ color: 'var(--ww-text)', fontWeight: 600 }}>{title}</h5>
      <p style={{ color: 'var(--ww-text-muted)', maxWidth: 360, margin: '8px auto 20px' }}>{description}</p>
      {actionLabel && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
