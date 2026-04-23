import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  test('renders children', () => {
    render(
      <InputGroup>
        <input placeholder="Enter value" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  test('renders prepend content', () => {
    render(
      <InputGroup prepend={<span>$</span>}>
        <input />
      </InputGroup>
    );
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  test('renders append content', () => {
    render(
      <InputGroup append={<span>.00</span>}>
        <input />
      </InputGroup>
    );
    expect(screen.getByText('.00')).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(
      <InputGroup label="Amount" htmlFor="amount">
        <input id="amount" />
      </InputGroup>
    );
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  test('associates label with input via htmlFor', () => {
    render(
      <InputGroup label="Amount" htmlFor="amount">
        <input id="amount" />
      </InputGroup>
    );
    const label = screen.getByText('Amount');
    expect(label).toHaveAttribute('for', 'amount');
  });

  test('shows error message', () => {
    render(
      <InputGroup error="This field is required">
        <input />
      </InputGroup>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  test('shows hint text when no error', () => {
    render(
      <InputGroup hint="Enter your amount in USD">
        <input />
      </InputGroup>
    );
    expect(screen.getByText('Enter your amount in USD')).toBeInTheDocument();
  });

  test('hides hint when error is present', () => {
    render(
      <InputGroup error="Required" hint="Some hint">
        <input />
      </InputGroup>
    );
    expect(screen.queryByText('Some hint')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('applies disabled styles', () => {
    const { container } = render(
      <InputGroup disabled>
        <input />
      </InputGroup>
    );
    const wrapper = container.querySelector('.pointer-events-none');
    expect(wrapper).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <InputGroup className="my-group">
        <input />
      </InputGroup>
    );
    expect(container.firstChild).toHaveClass('my-group');
  });

  test('renders with sm size', () => {
    render(
      <InputGroup size="sm" prepend={<span>@</span>}>
        <input />
      </InputGroup>
    );
    expect(screen.getByText('@').closest('span')).toHaveClass('text-xs');
  });

  test('renders with lg size', () => {
    render(
      <InputGroup size="lg" prepend={<span>@</span>}>
        <input />
      </InputGroup>
    );
    expect(screen.getByText('@').closest('span')).toHaveClass('text-base');
  });
});
