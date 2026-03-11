import { useState, useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`ww-toast ww-toast--${type} ${visible ? 'ww-toast--enter' : 'ww-toast--exit'}`}>
      <span className="ww-toast__icon">{icons[type]}</span>
      <span className="ww-toast__message">{message}</span>
      <button className="ww-toast__close" onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>×</button>
    </div>
  );
}
