import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskForm from '../components/TaskForm';

// ─────────────────────────────────────────────
// TaskForm — the most important component to
// test since it handles all user input + validation
// ─────────────────────────────────────────────

describe('TaskForm', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  // ─── RENDERING ───
  it('renders the form with all fields', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    expect(screen.getByPlaceholderText(/what do you need to do/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  // ─── VALIDATION ───
  it('shows error when submitting with empty title', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByText(/task title is required/i)).toBeInTheDocument();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('shows error when title is less than 3 characters', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    await userEvent.type(screen.getByPlaceholderText(/what do you need to do/i), 'ab');
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('clears error when user starts typing after error', async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(await screen.findByText(/task title is required/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/what do you need to do/i), 'T');
    expect(screen.queryByText(/task title is required/i)).not.toBeInTheDocument();
  });

  // ─── SUBMISSION ───
  it('calls onAddTask with correct data on valid submit', async () => {
    mockOnAddTask.mockResolvedValue();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    await userEvent.type(screen.getByPlaceholderText(/what do you need to do/i), 'Buy groceries');
    await userEvent.type(screen.getByPlaceholderText(/add description/i), 'Milk and eggs');

    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'high' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Shopping' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith({
        title: 'Buy groceries',
        description: 'Milk and eggs',
        priority: 'high',
        category: 'Shopping',
      });
    });
  });

  it('resets form fields after successful submission', async () => {
    mockOnAddTask.mockResolvedValue();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const titleInput = screen.getByPlaceholderText(/what do you need to do/i);
    await userEvent.type(titleInput, 'Some task');
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    });
  });

  it('shows loading state during submission', async () => {
    // simulate slow API
    mockOnAddTask.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );
    render(<TaskForm onAddTask={mockOnAddTask} />);

    await userEvent.type(screen.getByPlaceholderText(/what do you need to do/i), 'Async task');
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByText(/adding/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adding/i })).toBeDisabled();
  });

  it('shows error message when onAddTask throws', async () => {
    mockOnAddTask.mockRejectedValue(new Error('Network error'));
    render(<TaskForm onAddTask={mockOnAddTask} />);

    await userEvent.type(screen.getByPlaceholderText(/what do you need to do/i), 'Failing task');
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByText(/failed to add task/i)).toBeInTheDocument();
  });

  // ─── DEFAULT VALUES ───
  it('has medium as default priority', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    expect(screen.getByLabelText(/priority/i).value).toBe('medium');
  });

  it('has General as default category', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    expect(screen.getByLabelText(/category/i).value).toBe('General');
  });
});