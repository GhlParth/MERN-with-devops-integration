import React, { useState } from 'react';
import { Trash2, Check, Edit2, Save, X } from 'lucide-react';
import './TaskItem.css';

function TaskItem({ task, index, onToggleComplete, onDeleteTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);

  const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Learning'];

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdateTask(task._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        category: editCategory,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return '#f56565';
      case 'medium':
        return '#ed8936';
      case 'low':
        return '#48bb78';
      default:
        return '#4299e1';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high':
        return '🔴 High';
      case 'medium':
        return '🟡 Medium';
      case 'low':
        return '🟢 Low';
      default:
        return priority;
    }
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="task-checkbox">
        <button
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task._id, task.completed)}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check size={16} />}
        </button>
      </div>

      <div className="task-content">
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input title-input"
              autoFocus
              onKeyDown={handleKeyDown}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-input description-input"
              placeholder="Description"
              rows="2"
              onKeyDown={handleKeyDown}
            />
            <div className="edit-selects">
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="edit-select"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="edit-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="edit-actions">
              <button 
                className="save-btn"
                onClick={handleSaveEdit}
                title="Save changes"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
              <button 
                className="cancel-btn"
                onClick={handleCancelEdit}
                title="Cancel editing"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="task-view">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                <Edit2 size={16} />
              </button>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-footer">
              <span className="category-badge">{task.category}</span>
            </div>
          </div>
        )}
      </div>

      <div className="task-meta">
        <span 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDeleteTask(task._id)}
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default TaskItem;
