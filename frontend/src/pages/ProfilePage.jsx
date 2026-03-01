import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAPI, authAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import { User, Mail, Lock, Bell, Settings, Eye, EyeOff, CheckCircle2, Save, ArrowRight } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '', faculty: user?.faculty || '', degree: user?.degree || '',
    year: user?.year || 1, studentId: user?.studentId || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: ''
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userAPI.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.changePassword(passwordData);
      setSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8 text-orange-400" />
              Profile Settings
            </h1>
            <p className="text-slate-400">Manage your account and academic information</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/15 border border-green-500/40 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-green-300 text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Profile Section */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-black text-white text-3xl shadow-lg">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="text-orange-400 text-sm">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-xl text-orange-300 font-semibold transition"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/20 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Full Name</p>
                  <p className="text-white font-semibold">{user?.name}</p>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Student ID</p>
                  <p className="text-white font-semibold">{user?.studentId || 'Not set'}</p>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Faculty</p>
                  <p className="text-white font-semibold">{user?.faculty}</p>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Degree</p>
                  <p className="text-white font-semibold">{user?.degree}</p>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Year</p>
                  <p className="text-white font-semibold">Year {user?.year}</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-xs text-orange-300 mb-1">Semester</p>
                  <p className="text-white font-semibold">Semester 1 • 2026</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Student ID</label>
                    <input
                      type="text"
                      value={profileData.studentId}
                      onChange={(e) => setProfileData({...profileData, studentId: e.target.value})}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Faculty</label>
                    <select
                      value={profileData.faculty}
                      onChange={(e) => setProfileData({...profileData, faculty: e.target.value})}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    >
                      {['Faculty of Engineering', 'Faculty of Computing', 'Faculty of Business', 'Faculty of Humanities', 'Faculty of Science'].map((f) => (
                        <option key={f} value={f} className="bg-slate-900">{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Year</label>
                    <select
                      value={profileData.year}
                      onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    >
                      {[1, 2, 3, 4].map((y) => (
                        <option key={y} value={y} className="bg-slate-900">Year {y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Degree</label>
                    <select
                      value={profileData.degree}
                      onChange={(e) => setProfileData({...profileData, degree: e.target.value})}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                    >
                      {['Bachelor of Software Engineering', 'Bachelor of Information Technology', 'Bachelor of Engineering', 'Bachelor of Data Science', 'Master of Information Technology'].map((d) => (
                        <option key={d} value={d} className="bg-slate-900">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-600/40"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}
          </div>

          {/* Password Section */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-red-400" />
              Security & Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPwd ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                    className="absolute right-4 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showCurrentPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPwd ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd(!showNewPwd)}
                    className="absolute right-4 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showNewPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/40"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              Account Information
            </h2>
            <div className="space-y-3">
              <div className="bg-slate-700/20 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Email Address</p>
                <p className="text-white font-semibold">{user?.email}</p>
                <p className="text-xs text-green-400 mt-1">✓ Verified</p>
              </div>
              <div className="bg-slate-700/20 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Account Role</p>
                <p className="text-white font-semibold capitalize">{user?.role || 'Student'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
   