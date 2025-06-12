import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [priority, setPriority] = useState('medium');
  const [categories] = useState(['Work', 'Personal', 'Shopping']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Add a new task
  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([
        ...tasks,
        { text: input, completed: false, priority, category: selectedCategory }
      ]);
      setInput('');
      setPriority('medium');
    }
  };

  // Toggle completion
  const toggleComplete = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete a task
  const handleDeleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit task text
  const handleEditTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  // Move task up
  const handleMoveUp = index => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  // Move task down
  const handleMoveDown = index => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  };

  // Filtering logic (category, search, and completed/active)
  const filteredTasks = tasks.filter(task => {
    const matchesCategory =
      categoryFilter === 'All' || task.category === categoryFilter;
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    let matchesStatus = true;
    if (filter === 'active') matchesStatus = !task.completed;
    else if (filter === 'completed') matchesStatus = task.completed;
    return matchesCategory && matchesSearch && matchesStatus;
  });

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="add-task-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="primary-btn" onClick={handleAddTask}>Add</button>
      </div>
      <div className="filter-buttons">
        <button className="primary-btn" onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
        <button className="primary-btn" onClick={() => setFilter('active')} disabled={filter === 'active'}>Active</button>
        <button className="primary-btn" onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      </div>


      <ul>
        {filteredTasks.map((task, idx) => {
          // Find the index in the original tasks array for moving up/down and editing
          const originalIndex = tasks.indexOf(task);
          return (
            <TodoItem
              key={originalIndex}
              task={task}
              index={originalIndex}
              onComplete={toggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isFirst={originalIndex === 0}
              isLast={originalIndex === tasks.length - 1}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
