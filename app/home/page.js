"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// IMPORTANT: Replace these fallback items with your actual UI components
// importing from your @/components/ui path if necessary.
const CustomLoader = () => <div className="p-4 text-center text-blue-500 font-semibold animate-pulse">Loading tasks...</div>;
const CustomToast = ({ message, type }) => (
  <div className={`p-3 my-2 rounded-md border text-sm ${type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
    {message}
  </div>
);

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status states
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const API_URL = 'http://localhost:5000/api/tasks';

  // Helper to show brief toast notifications
  const showNotification = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 4000);
  };

  // 1. GET All Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setTasks(response.data.tasks || []);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to load tasks from server.";
      showNotification(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. POST Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, { task: newTaskTitle });
      if (response.data.success) {
        setTasks(prev => [...prev, response.data.task]);
        setNewTaskTitle('');
        showNotification("Task created successfully!", "success");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Could not add task.";
      showNotification(errMsg, 'error');
    }
  };

  // 3. PUT Toggle Task Completion Status
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { isCompleted: !currentStatus });
      if (response.data.success) {
        setTasks(prev => prev.map(t => t.id === id ? response.data.task : t));
      }
    } catch (err) {
      showNotification("Failed to update task completion status.", 'error');
    }
  };

  // 4. DELETE Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
      showNotification("Task removed.", "success");
    } catch (err) {
      showNotification("Could not delete task.", 'error');
    }
  };

  // 5. GET Search Tasks
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      fetchTasks();
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/search?q=${query}`);
      if (response.data.success) {
        setTasks(response.data.tasks || []);
      }
    } catch (err) {
      // Gracefully handle if search yields a 404/empty error
      setTasks([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Toast Alert System */}
      {toast.show && <CustomToast message={toast.message} type={toast.type} />}

      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Add
        </button>
      </form>

      {/* Tasks List Conditional Output */}
      {loading ? (
        <CustomLoader />
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggleComplete(item.id, item.isCompleted)}
                  className="w-4 h-4 cursor-pointer text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-base ${item.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.task}
                </span>
              </div>
              <button 
                onClick={() => handleDeleteTask(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}