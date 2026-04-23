import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from './Alert';

describe('Alert', () => {
  test('renders children', () => {
    render(<Alert>Something went wrong</Alert>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('has role="alert" for accessibility', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(<Alert title="Error">Details here</Alert>);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('applies variant class', () => {
    render(<Alert variant="success">OK</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-success');
  });

  test('applies destructive variant class', () => {
    render(<Alert variant="destructive">Oops</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-destructive');
  });

  test('applies warning variant class', () => {
    render(<Alert variant="warning">Watch out</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-warning');
  });

  test('applies info variant class', () => {
    render(<Alert variant="info">FYI</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  test('shows dismiss button when dismissible', () => {
    render(<Alert dismissible onDismiss={() => {}}>Msg</Alert>);
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  test('calls onDismiss when dismiss button clicked', () => {
    const onDismiss = jest.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Msg</Alert>);
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('does not show dismiss button when not dismissible', () => {
    render(<Alert>Msg</Alert>);
    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
  });

  test('applies size class for sm', () => {
    render(<Alert size="sm">Small</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('text-xs');
  });

  test('applies size class for lg', () => {
    render(<Alert size="lg">Large</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('text-base');
  });

  test('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>Msg</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Alert className="my-custom">Msg</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('my-custom');
  });
});
