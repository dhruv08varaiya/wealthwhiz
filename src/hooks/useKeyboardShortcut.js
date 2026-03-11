import { useEffect, useCallback } from 'react';

export function useKeyboardShortcut(shortcuts) {
  const handleKeyDown = useCallback((e) => {
    // Don't trigger when typing in inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    shortcuts.forEach(({ key, ctrlKey, handler }) => {
      if (e.key === key && (!ctrlKey || e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handler();
      }
    });
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
