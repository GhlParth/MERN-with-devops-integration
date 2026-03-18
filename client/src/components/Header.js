import React from 'react';
import { Zap, Trash2 } from 'lucide-react';
import './Header.css';

function Header({ onClearCompleted }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <div className="logo">
            <Zap size={28} />
          </div>
          <div>
            <h1>TaskFlow</h1>
            <p>Stay organized, stay productive</p>
          </div>
        </div>
        <button 
          className="clear-btn"
          onClick={onClearCompleted}
          title="Delete all completed tasks"
        >
          <Trash2 size={18} />
          <span>Clear Completed</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
