import React from 'react';

type AlertVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';
type AlertSize = 'sm' | 'md' | 'lg';

interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  dismissible?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  default: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  destructive: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const sizeClasses: Record<AlertSize, string> = {
  sm: 'text-xs p-3',
  md: 'text-sm p-4',
  lg: 'text-base p-5',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  size = 'md',
  title,
  children,
  onDismiss,
  dismissible = false,
  icon,
  className = '',
}) => {
  const variantClass = variant === 'default' ? 'alert-default' : `alert-${variant}`;
  const resolvedIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <div
      role="alert"
      className={`alert ${variantClass} ${sizeClasses[size]} ${className}`}
    >
      {resolvedIcon && (
        <span className="flex-shrink-0 mt-0.5">{resolvedIcon}</span>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold leading-tight mb-1">{title}</p>
        )}
        <div className="leading-relaxed">{children}</div>
      </div>
      {(dismissible || onDismiss) && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="flex-shrink-0 ml-auto -mr-1 -mt-1 p-1 rounded opacity-70 hover:opacity-100 focus-ring transition-opacity"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
