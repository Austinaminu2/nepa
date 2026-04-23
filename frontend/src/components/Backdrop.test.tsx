import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Backdrop } from './Backdrop';

describe('Backdrop', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  test('renders when open=true', () => {
    render(<Backdrop open={true} />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });

  test('does not render when open=false', () => {
    render(<Backdrop open={false} />);
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Backdrop open={true} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when static=true', () => {
    const onClick = jest.fn();
    render(<Backdrop open={true} onClick={onClick} static={true} />);
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('calls onClick on Escape key', () => {
    const onClick = jest.fn();
    render(<Backdrop open={true} onClick={onClick} />);
    fireEvent.keyDown(screen.getByTestId('backdrop'), { key: 'Escape' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('applies blur variant class', () => {
    render(<Backdrop open={true} variant="blur" />);
    expect(screen.getByTestId('backdrop')).toHaveClass('backdrop-blur-sm');
  });

  test('applies dark variant class', () => {
    render(<Backdrop open={true} variant="dark" />);
    expect(screen.getByTestId('backdrop')).toHaveClass('bg-black/80');
  });

  test('applies light variant class', () => {
    render(<Backdrop open={true} variant="light" />);
    expect(screen.getByTestId('backdrop')).toHaveClass('bg-white/60');
  });

  test('locks body scroll when open', () => {
    render(<Backdrop open={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('restores body scroll when closed', () => {
    const { rerender } = render(<Backdrop open={true} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Backdrop open={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  test('renders children', () => {
    render(<Backdrop open={true}><div data-testid="child">Content</div></Backdrop>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Backdrop open={true} className="my-backdrop" />);
    expect(screen.getByTestId('backdrop')).toHaveClass('my-backdrop');
  });

  test('has aria-hidden for accessibility', () => {
    render(<Backdrop open={true} />);
    expect(screen.getByTestId('backdrop')).toHaveAttribute('aria-hidden', 'true');
  });
});
