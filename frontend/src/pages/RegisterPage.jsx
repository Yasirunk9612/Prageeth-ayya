import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, Shield, GraduationCap } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', passwordConfirm: '', studentId: '',
    faculty: 'Faculty of Computing', degree: 'Bachelor of Software Engineering', year: '1'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await register(formData);
    if (result.success) {
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Join ClashGuard</h1>
          <p className="text-slate-400">Smart deadline management starts here</p>
          <div className="flex justify-center gap-2 mt-6">
            <div className={`h-2 w-8 rounded-full transition ${step === 1 ? 'bg-purple-500' : 'bg-slate-600'}`}></div>
            <div className={`h-2 w-8 rounded-full transition ${step === 2 ? 'bg-purple-500' : 'bg-slate-600'}`}></div>
          </div>
        </div>

        {/* Register Container */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/15 border border-red-500/40 rounded-xl">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/15 border border-green-500/40 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-green-300 text-sm font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-purple-400" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Student ID</label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="ENG/2024/001"
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    required
                    className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  className="w-full mt-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/40"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Step 2: Academic Info & Password */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-pink-400" />
                  Academic & Security
                </h2>

                <div className="space-y-4 bg-slate-700/20 border border-slate-700/30 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">Faculty</label>
                      <select
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                        className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      >
                        {['Faculty of Engineering', 'Faculty of Computing', 'Faculty of Business', 'Faculty of Humanities', 'Faculty of Science'].map((f) => (
                          <option key={f} value={f} className="bg-slate-900">{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">Year</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      >
                        {[1, 2, 3, 4].map((y) => (
                          <option key={y} value={y} className="bg-slate-900">Year {y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Degree Program</label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    >
                      {['Bachelor of Software Engineering', 'Bachelor of Information Technology', 'Bachelor of Engineering', 'Bachelor of Data Science', 'Master of Information Technology'].map((d) => (
                        <option key={d} value={d} className="bg-slate-900">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <label className="block text-sm font-semibold text-slate-200">Password *</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full bg-slate-700/40 border border-slate-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition"
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 rounded-xl text-white font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-600/40"
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
