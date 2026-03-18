import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import { taskAPI } from './api/taskAPI';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    status: 'all', // all, active, completed
    priority: 'all', // all, low, medium, high
    search: ''
  });

  // Load tasks and stats on component mount
  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  // Apply filters whenever tasks or filters change
  useEffect(() => {
    applyFilters();
  }, [tasks, filters, applyFilters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.data || []);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const applyFilters = () => {
    let result = [...tasks];

    // Filter by status
    if (filters.status === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filters.status === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    setFilteredTasks(result);
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.data, ...tasks]);
      loadStats();
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Failed to add task');
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await taskAPI.updateTask(id, { completed: !completed });
      setTasks(tasks.map(task => task._id === id ? response.data.data : task));
      loadStats();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        loadStats();
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('Failed to delete task');
      }
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await taskAPI.updateTask(id, updates);
      setTasks(tasks.map(task => task._id === id ? response.data.data : task));
      loadStats();
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearCompleted = async () => {
    if (window.confirm('Delete all completed tasks?')) {
      try {
        await taskAPI.deleteCompletedTasks();
        loadTasks();
        loadStats();
      } catch (err) {
        console.error('Error clearing completed tasks:', err);
        alert('Failed to delete completed tasks');
      }
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header onClearCompleted={handleClearCompleted} />
        
        {error && <div className="error-banner">{error}</div>}
        
        <main className="main-content">
          <TaskForm onAddTask={handleAddTask} />
          
          {stats && <Stats stats={stats} />}
          
          <FilterBar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p>
                {tasks.length === 0 
                  ? '✨ No tasks yet. Add one to get started!' 
                  : '🔍 No tasks match your filters'}
              </p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
