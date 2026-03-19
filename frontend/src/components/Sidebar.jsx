import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LogOut, Menu, X, Home, User, BarChart3, Calendar, 
  Settings, Shield, Bell, Activity, AlertTriangle 
  Settings, Shield, Bell, Activity, CheckSquare 
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Burnout Analysis', path: '/burnout-analysis' },
    { icon: AlertTriangle, label: 'Collision Analysis', path: '/collision-analysis' },
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: Calendar, label: 'Deadlines', path: '/deadlines' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2.5 glass-card hover:bg-white/10"
      >
        {isOpen ? <X size={22} className="text-slate-200" /> : <Menu size={22} className="text-slate-200" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 glass-card rounded-none md:rounded-2xl m-0 md:m-4 md:ml-4 p-6 transform transition-all duration-300 ease-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:static flex flex-col`}
        style={{ backdropFilter: 'blur(30px)' }}
      >
        {/* Logo */}
        <div className="mb-8 pt-12 md:pt-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl shadow-lg">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-100">ClashGuard</h1>
              <p className="text-xs text-teal-400 font-medium">SLIIT Malabe</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="mb-6 p-4 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 rounded-xl border border-indigo-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-100 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            {user.year && (
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-semibold border border-indigo-500/30">
                  Year {user.year}
                </span>
                {user.faculty && (
                  <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-lg text-xs font-semibold border border-teal-500/30 truncate">
                    {user.faculty.split(' ')[2] || 'Faculty'}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 border border-red-500/20 font-medium group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
