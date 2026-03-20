import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stats from '../components/Stats';

describe('Stats', () => {
  const mockStats = {
    totalTasks: 10,
    activeTasks: 6,
    completedTasks: 4,
    completionRate: '40.00',
    highPriorityTasks: 2,
    priorityStats: []
  };

  it('renders all 4 stat cards with correct values', () => {
    render(<Stats stats={mockStats} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('40.00%')).toBeInTheDocument();
  });

  it('renders correct labels', () => {
    render(<Stats stats={mockStats} />);

    expect(screen.getByText(/total tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/active tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/completion/i)).toBeInTheDocument();
  });

  it('returns null when stats is not provided', () => {
    const { container } = render(<Stats stats={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles zero tasks correctly', () => {
    render(<Stats stats={{ ...mockStats, totalTasks: 0, completionRate: '0' }} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});