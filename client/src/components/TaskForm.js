import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Learning'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    if (title.trim().length < 3) {
      setError('Task title must be at least 3 characters');
      return;
    }

    setLoading(true);
    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
      });

      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('General');
      setError('');
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Add New Task</h2>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          className="form-input"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="2"
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
            disabled={loading}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            disabled={loading}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          <Plus size={20} />
          <span>{loading ? 'Adding...' : 'Add Task'}</span>
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}

export default TaskForm;
