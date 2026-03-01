import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ConflictList from '../components/ConflictList';
import WeeklyWorkloadCard from '../components/WeeklyWorkloadCard';
import { collisionAPI } from '../services/api';

const CollisionAnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Fetch collision analysis
  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collisionAPI.analyzeCollisions();
      setAnalysis(response.data);
    } catch (err) {
      console.error('Error fetching collision analysis:', err);
      setError(err.response?.data?.message || 'Failed to load collision analysis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-orange-400" />
                Collision Analysis
              </h1>
              <p className="text-slate-400">Monitor deadline conflicts and workload distribution</p>
            </div>
            <button
              onClick={fetchAnalysis}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 font-semibold rounded-xl transition disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Analyzing your deadlines...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-red-300 font-medium">{error}</p>
              <button
                onClick={fetchAnalysis}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Analysis Content */}
          {!loading && !error && analysis && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-sm">Same-Day Conflicts</p>
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-4xl font-black text-red-400">
                    {analysis.collisions?.length || 0}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Days with 3+ deadlines</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-sm">Daily Overloads</p>
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-4xl font-black text-orange-400">
                    {analysis.heavyDays?.length || 0}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Days exceeding 10 hours</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-sm">Health Score</p>
                    <AlertTriangle className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-4xl font-black text-purple-400">
                    {analysis.analysis?.healthScore || 100}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Overall workload health</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Conflict List - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <ConflictList 
                    collisions={analysis.collisions} 
                    heavyDays={analysis.heavyDays}
                  />
                </div>

                {/* Weekly Workload Card - Takes 1 column */}
                <div>
                  <WeeklyWorkloadCard analysis={analysis} />
                </div>
              </div>

              {/* Warnings Section */}
              {analysis.warnings && analysis.warnings.length > 0 && (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">⚠️ Active Warnings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.warnings.map((warning, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border ${
                          warning.severity === 'critical'
                            ? 'bg-red-500/10 border-red-500/30'
                            : warning.severity === 'high'
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-amber-500/10 border-amber-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              warning.severity === 'critical'
                                ? 'text-red-400'
                                : warning.severity === 'high'
                                ? 'text-orange-400'
                                : 'text-amber-400'
                            }`}
                          />
                          <div>
                            <p
                              className={`font-medium ${
                                warning.severity === 'critical'
                                  ? 'text-red-300'
                                  : warning.severity === 'high'
                                  ? 'text-orange-300'
                                  : 'text-amber-300'
                              }`}
                            >
                              {warning.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 capitalize">
                              Severity: {warning.severity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CollisionAnalysisPage;
