import { useContext } from 'react';
import { Calendar, AlertTriangle, TrendingUp, CheckCircle2, Clock, Bell, Search, Zap, BookOpen, Target } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { icon: Calendar, label: 'Active Deadlines', value: '8', color: 'bg-gradient-to-br from-cyan-500 to-blue-600', textColor: 'text-cyan-400' },
    { icon: AlertTriangle, label: 'Due This Week', value: '3', color: 'bg-gradient-to-br from-orange-500 to-red-600', textColor: 'text-orange-400' },
    { icon: CheckCircle2, label: 'Completed', value: '12', color: 'bg-gradient-to-br from-emerald-500 to-teal-600', textColor: 'text-emerald-400' },
    { icon: TrendingUp, label: 'Performance', value: '92%', color: 'bg-gradient-to-br from-purple-500 to-pink-600', textColor: 'text-purple-400' },
  ];

  const deadlines = [
    { id: 1, course: 'Software Engineering', task: 'Project Phase 2 Submission', due: 'Mar 8', days: 7, progress: 45, priority: 'high' },
    { id: 2, course: 'Data Structures', task: 'AVL Tree Implementation', due: 'Mar 12', days: 11, progress: 70, priority: 'high' },
    { id: 3, course: 'Web Development', task: 'Full Stack Application', due: 'Mar 15', days: 14, progress: 30, priority: 'medium' },
    { id: 4, course: 'Database Design', task: 'Normalization Exercise', due: 'Mar 18', days: 17, progress: 85, priority: 'low' },
  ];

  const upcomingEvents = [
    { icon: BookOpen, text: 'Completed ML Assignment', time: '2h ago', color: 'from-green-500/20 to-emerald-500/20', textColor: 'text-emerald-300' },
    { icon: AlertTriangle, text: '3 deadlines next week', time: '5h ago', color: 'from-orange-500/20 to-red-500/20', textColor: 'text-orange-300' },
    { icon: Zap, text: 'Great progress on projects!', time: '1d ago', color: 'from-purple-500/20 to-pink-500/20', textColor: 'text-purple-300' },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === 'high') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (priority === 'medium') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-green-500/20 text-green-300 border-green-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-slate-400">Let's manage your deadlines efficiently today</p>
            </div>
            <button className="relative p-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl transition">
              <Bell className="w-6 h-6 text-teal-400" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-slate-600/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Deadlines Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search & Filter */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search deadlines, courses..."
                  className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>

              {/* Deadlines Cards */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-teal-400" />
                  Upcoming Deadlines
                </h2>

                {deadlines.map((d) => (
                  <div key={d.id} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{d.course}</h3>
                        <p className="text-slate-400 text-sm">{d.task}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getPriorityStyle(d.priority)}`}>
                        {d.priority}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {d.days} days remaining
                      </span>
                      <span className="text-teal-400 font-semibold">Due {d.due}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-teal-400">{d.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${d.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Academic Info Card */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-400" />
                  Academic Profile
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Faculty</p>
                    <p className="text-white font-semibold text-sm">{user?.faculty || 'Computing'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Degree</p>
                    <p className="text-white font-semibold text-sm">{user?.degree || 'BS Computer Science'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Year</p>
                    <p className="text-white font-semibold text-sm">Year {user?.year || '3'}</p>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-3">
                    <p className="text-xs text-teal-300 mb-1">Current Semester</p>
                    <p className="text-white font-semibold text-sm">Semester 1 • 2026</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className={`bg-gradient-to-r ${event.color} border border-slate-700/50 rounded-lg p-3 flex gap-3`}>
                      <event.icon className={`w-5 h-5 shrink-0 ${event.textColor}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${event.textColor}`}>{event.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
          