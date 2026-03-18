import React from 'react';
import { CheckCircle2, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import './Stats.css';

function Stats({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon total">
          <Zap size={20} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon active">
          <AlertCircle size={20} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{stats.activeTasks}</div>
          <div className="stat-label">Active Tasks</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <CheckCircle2 size={20} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{stats.completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon progress">
          <TrendingUp size={20} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
