"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomLoader from '@/components/CustomLoader';
import CustomToast from '@/components/CustomToast';

export default function TaskPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const API_URL = 'http://localhost:5000/api/tasks';

  // Helper utility to safely construct the authenticated headers instance dynamically
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Route not accessible. Please login!");
        router.push("/login");
        return null;
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

  const showNotification = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 4000);
  };

  // 1. GET All Tasks
  const fetchTasks = async () => {
    const config = getAuthConfig();
    if (!config) return;

    try {
      setLoading(true);
      const response = await axios.get(API_URL, config);
      if (response.data.success) {
        setTasks(response.data.tasks || []);
      }
    } catch (err) {
      if (err.response?.status === 401) return router.push('/login');
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

    const config = getAuthConfig();
    if (!config) return;

    try {
      const response = await axios.post(API_URL, { task: newTaskTitle }, config);
      if (response.data.success) {
        setTasks(prev => [...prev, response.data.task]);
        setNewTaskTitle('');
        showNotification("Document entry synced successfully!", "success");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Could not add task.";
      showNotification(errMsg, 'error');
    }
  };

  // 3. PUT Toggle Task Completion Status
  const handleToggleComplete = async (id, currentStatus) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
      const response = await axios.put(`${API_URL}/${id}`, { isCompleted: !currentStatus }, config);
      if (response.data.success) {
        setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? response.data.task : t));
      }
    } catch (err) {
      showNotification("Failed to update status flag.", 'error');
    }
  };

  // 4. DELETE Task
  const handleDeleteTask = async (id) => {
    const config = getAuthConfig();
    if (!config) return;

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      setTasks(prev => prev.filter(t => t._id !== id && t.id !== id));
      showNotification("Document dropped from cluster.", "success");
    } catch (err) {
      showNotification("Could not delete record.", 'error');
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

    const config = getAuthConfig();
    if (!config) return;

    try {
      const response = await axios.get(`${API_URL}/search?q=${query}`, config);
      if (response.data.success) {
        setTasks(response.data.tasks || []);
      }
    } catch (err) {
      setTasks([]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8 antialiased selection:bg-blue-500/30 transition-colors">
      {toast.show && (
        <CustomToast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, show: false }))} 
        />
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        <div className="md:col-span-5 space-y-6 text-left pt-4 md:pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping" />
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Live DB Active</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              MERN Asset <br />Deployment Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              An optimized workspace directly wired into a Node.js backend. Perform schema routing, instant query searching, and structured database mutations smoothly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900">
              <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">{tasks.length}</div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Total Stored</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900">
              <div className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {tasks.filter(t => t.isCompleted).length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Completed</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-lg dark:shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Cluster Records Viewport</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time state mutations engine</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 tracking-tight">
              v1.2.0-STABLE
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Live Regular Expression Filter</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Query database items instantly..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">🔍</span>
            </div>
          </div>

          <form onSubmit={handleCreateTask} className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Initialize Document Structure</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Assign target schema task item..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/15 flex items-center justify-center whitespace-nowrap"
              >
                Deploy Item
              </button>
            </div>
          </form>

          <div className="space-y-3 pt-2">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Rendered Documents</h3>
            
            {loading ? (
              <CustomLoader />
            ) : tasks.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-400 dark:text-slate-500 italic">No document clusters captured in current pipeline.</p>
              </div>
            ) : (
              <ul className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
                {tasks.map((item) => {
                  const id = item._id || item.id;
                  return (
                    <li 
                      key={id} 
                      className="group flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={item.isCompleted || false}
                            onChange={() => handleToggleComplete(id, item.isCompleted)}
                            className="peer w-4 h-4 opacity-0 absolute cursor-pointer z-10"
                          />
                          <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center pointer-events-none ${
                            item.isCompleted 
                              ? 'bg-blue-600 border-blue-500 text-white' 
                              : 'bg-transparent border-slate-300 dark:border-slate-700 group-hover:border-slate-400 dark:group-hover:border-slate-500'
                          }`}>
                            {item.isCompleted && (
                              <svg className="w-2.5 h-2.5 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm font-medium transition-all duration-200 ${
                          item.isCompleted 
                            ? 'line-through text-slate-400 dark:text-slate-500' 
                            : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>
                          {item.task}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteTask(id)}
                        className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 md:opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}