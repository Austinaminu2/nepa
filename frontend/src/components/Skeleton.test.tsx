import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  test('renders with default text variant', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('has aria-busy="true" for accessibility', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  test('has aria-label for screen readers', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  test('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const lines = container.querySelectorAll('.skeleton-text');
    expect(lines.length).toBe(3);
  });

  test('last text line is shorter (70% width)', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const lines = container.querySelectorAll('.skeleton-text');
    const lastLine = lines[lines.length - 1] as HTMLElement;
    expect(lastLine.style.width).toBe('70%');
  });

  test('renders avatar variant', () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.querySelector('.skeleton-avatar')).toBeInTheDocument();
  });

  test('renders card variant', () => {
    const { container } = render(<Skeleton variant="card" />);
    expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
  });

  test('renders button variant', () => {
    const { container } = render(<Skeleton variant="button" />);
    expect(container.querySelector('.skeleton-button')).toBeInTheDocument();
  });

  test('renders input variant', () => {
    const { container } = render(<Skeleton variant="input" />);
    expect(container.querySelector('.skeleton-input')).toBeInTheDocument();
  });

  test('applies custom width and height', () => {
    render(<Skeleton variant="custom" width={200} height={50} />);
    const el = screen.getByRole('status');
    expect(el).toHaveStyle({ width: '200px', height: '50px' });
  });

  test('applies custom className', () => {
    render(<Skeleton className="my-skeleton" />);
    expect(screen.getByRole('status')).toHaveClass('my-skeleton');
  });

  test('includes sr-only loading text', () => {
    render(<Skeleton />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
