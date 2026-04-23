import React, { useEffect } from 'react';

type BackdropVariant = 'default' | 'blur' | 'dark' | 'light';

interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  variant?: BackdropVariant;
  className?: string;
  children?: React.ReactNode;
  /** Prevent closing on click */
  static?: boolean;
}

const variantStyles: Record<BackdropVariant, string> = {
  default: 'bg-black/50',
  blur: 'bg-black/40 backdrop-blur-sm',
  dark: 'bg-black/80',
  light: 'bg-white/60 backdrop-blur-sm',
};

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  variant = 'default',
  className = '',
  children,
  static: isStatic = false,
}) => {
  // Lock body scroll when backdrop is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleClick = () => {
    if (!isStatic && onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isStatic && onClick) onClick();
  };

  return (
    <div
      role="presentation"
      aria-hidden="true"
      data-testid="backdrop"
      className={`fixed inset-0 ${variantStyles[variant]} transition-opacity duration-300 ${className}`}
      style={{ zIndex: 'var(--z-modal-backdrop)' as React.CSSProperties['zIndex'] }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
