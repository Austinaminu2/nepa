import React from 'react';

type InputGroupSize = 'sm' | 'md' | 'lg';

interface InputGroupProps {
  children: React.ReactNode;
  /** Content prepended before the input (icon, text, button) */
  prepend?: React.ReactNode;
  /** Content appended after the input (icon, text, button) */
  append?: React.ReactNode;
  size?: InputGroupSize;
  /** Error message shown below the group */
  error?: string;
  /** Helper text shown below the group */
  hint?: string;
  /** Label for the group */
  label?: string;
  /** Associates label with input via htmlFor */
  htmlFor?: string;
  className?: string;
  disabled?: boolean;
}

const sizeClasses: Record<InputGroupSize, { addon: string; input: string }> = {
  sm: { addon: 'px-2 py-1.5 text-xs', input: 'py-1.5 text-xs' },
  md: { addon: 'px-3 py-2 text-sm', input: 'py-2 text-sm' },
  lg: { addon: 'px-4 py-3 text-base', input: 'py-3 text-base' },
};

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  prepend,
  append,
  size = 'md',
  error,
  hint,
  label,
  htmlFor,
  className = '',
  disabled = false,
}) => {
  const { addon, input } = sizeClasses[size];
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  const hintId = htmlFor ? `${htmlFor}-hint` : undefined;

  const addonBase = `
    flex items-center flex-shrink-0 border border-border bg-muted text-muted-foreground
    ${addon} ${disabled ? 'opacity-50' : ''}
  `.trim();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="label">
          {label}
        </label>
      )}

      <div
        className={`flex w-full rounded-md overflow-hidden border border-border focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-shadow ${disabled ? 'opacity-50 pointer-events-none' : ''} ${error ? 'border-destructive focus-within:border-destructive focus-within:ring-destructive' : ''}`}
      >
        {prepend && (
          <span className={`${addonBase} border-r border-border rounded-l-md`}>
            {prepend}
          </span>
        )}

        <div className={`flex-1 min-w-0 [&>input]:border-0 [&>input]:rounded-none [&>input]:shadow-none [&>input]:focus:ring-0 [&>input]:${input} [&>input]:w-full`}>
          {children}
        </div>

        {append && (
          <span className={`${addonBase} border-l border-border rounded-r-md`}>
            {append}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={hintId} className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
};
