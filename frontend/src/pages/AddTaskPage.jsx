import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, BookOpen, AlertCircle, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { taskAPI } from '../services/api';

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    module: '',
    type: 'Assignment',
    priority: 'Medium',
    deadline: '',
    workloadHours: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate deadline is in future
      const deadline = new Date(formData.deadline);
      if (deadline < new Date()) {
        setError('Deadline must be a future date');
        setLoading(false);
        return;
      }

      // Validate workload hours
      const hours = parseInt(formData.workloadHours);
      if (hours < 1 || hours > 48) {
        setError('Workload hours must be between 1 and 48');
        setLoading(false);
        return;
      }

      await taskAPI.createTask(formData);
      setSuccess('Task created successfully!');
      setTimeout(() => {
        navigate('/tasks');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Add New Task</h1>
          <p className="text-slate-400">Create a new academic task or deadline</p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 shadow-2xl">
            
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g., Data Structures Assignment 3"
                />
              </div>

              {/* Module Name */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Module Name *
                </label>
                <input
                  type="text"
                  name="module"
                  value={formData.module}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="e.g., CS201 - Data Structures"
                />
              </div>

              {/* Task Type & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Exam">Exam</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Presentation">Presentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Priority Level *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Deadline & Workload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Deadline Date *
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Workload (Hours) *
                  </label>
                  <input
                    type="number"
                    name="workloadHours"
                    value={formData.workloadHours}
                    onChange={handleChange}
                    required
                    min="1"
                    max="48"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    placeholder="1-48"
                  />
                </div>
              </div>

              {/* Helper Text */}
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
                <p className="text-sm text-indigo-300">
                  <strong>Note:</strong> Deadline must be a future date and workload should be between 1-48 hours.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {loading ? 'Creating...' : 'Create Task'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-xl font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AddTaskPage;
