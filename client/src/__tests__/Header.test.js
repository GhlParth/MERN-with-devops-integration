import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header onClearCompleted={jest.fn()} />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Header onClearCompleted={jest.fn()} />);
    expect(screen.getByText(/stay organized/i)).toBeInTheDocument();
  });

  it('renders the clear completed button', () => {
    render(<Header onClearCompleted={jest.fn()} />);
    expect(screen.getByRole('button', { name: /clear completed/i })).toBeInTheDocument();
  });

  it('calls onClearCompleted when button is clicked', () => {
    const mockClear = jest.fn();
    render(<Header onClearCompleted={mockClear} />);

    fireEvent.click(screen.getByRole('button', { name: /clear completed/i }));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});