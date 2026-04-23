import React from 'react';

type SkeletonVariant = 'text' | 'avatar' | 'card' | 'button' | 'input' | 'custom';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  /** Number of text lines to render (text variant only) */
  lines?: number;
  className?: string;
  /** Disable animation (respects prefers-reduced-motion automatically via CSS) */
  animated?: boolean;
}

const variantClass: Record<SkeletonVariant, string> = {
  text: 'skeleton skeleton-text',
  avatar: 'skeleton skeleton-avatar',
  card: 'skeleton skeleton-card',
  button: 'skeleton skeleton-button',
  input: 'skeleton skeleton-input',
  custom: 'skeleton',
};

const SingleSkeleton: React.FC<Omit<SkeletonProps, 'lines'>> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animated = true,
}) => {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <span
      aria-hidden="true"
      className={`${variantClass[variant]} ${!animated ? 'animation-none' : ''} ${className}`}
      style={style}
    />
  );
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  lines = 3,
  width,
  height,
  className = '',
  animated = true,
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div
        role="status"
        aria-label="Loading"
        aria-busy="true"
        className={`space-y-2 ${className}`}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <SingleSkeleton
            key={i}
            variant="text"
            animated={animated}
            // Last line is shorter for a natural look
            width={i === lines - 1 ? '70%' : width}
            height={height}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <span
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={`${variantClass[variant]} ${!animated ? 'animation-none' : ''} ${className}`}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};
