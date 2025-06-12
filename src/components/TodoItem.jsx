import React, { useState } from 'react';

function TodoItem({ task, index, onComplete, onDelete, onEdit, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission if using a form
    if (editValue.trim() !== '') {
      onEdit(index, editValue);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="task-row">
          <div className="task-col task-text">{task.text}</div>
          <div className="task-col">
            <span className={`priority-label ${task.priority}`}>{task.priority}</span>
          </div>
          <div className="task-col">
            <span className="category-label">{task.category}</span>
          </div>
          <div className="task-col task-actions">
            <button onClick={() => onComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
            <button onClick={() => onMoveUp(index)} disabled={isFirst}>↑</button>
            <button onClick={() => onMoveDown(index)} disabled={isLast}>↓</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
