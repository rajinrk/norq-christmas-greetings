import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function GiftModal({ open, onClose, children }) {
  const modalRoot = document.getElementById('modal-root');

  // Prevent background scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || !modalRoot) return null;

  return createPortal(
    <div className="gift-modal-overlay" onClick={onClose}>
      <div className="gift-modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
