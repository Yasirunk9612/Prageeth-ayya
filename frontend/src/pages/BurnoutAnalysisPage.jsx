import { useState, useEffect } from 'react';
import { RefreshCw, Lightbulb, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import BurnoutMeter from '../components/BurnoutMeter';
import StressAnalyticsDashboard from '../components/StressAnalyticsDashboard';
import AcademicHeatmap from '../components/AcademicHeatmap';
import { burnoutAPI } from '../services/api';

const BurnoutAnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Fetch burnout analysis
  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await burnoutAPI.analyzeBurnout();
      setAnalysis(response.data);
    } catch (err) {
      console.error('Error fetching burnout analysis:', err);
      setError(err.response?.data?.message || 'Failed to load burnout analysis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-teal-950 to-slate-950 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-orange-400" />
                Burnout Prediction
              </h1>
              <p className="text-slate-400">Monitor your stress levels and academic workload</p>
            </div>
            <button
              onClick={fetchAnalysis}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 font-semibold rounded-xl transition disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Analysis
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Analyzing your workload and stress levels...</p>
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

          {/* Main Content */}
          {!loading && !error && analysis && (
            <>
              {/* Top Section - Burnout Meter and Key Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Burnout Meter - Takes 1 column */}
                <div>
                  <BurnoutMeter 
                    riskScore={analysis.riskScore}
                    riskLevel={analysis.riskLevel}
                  />
                </div>

                {/* Quick Stats - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Risk Overview Card */}
                  <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Your Risk Assessment</h3>
                    <div className="space-y-3">
                      {analysis.riskLevel === 'Low' && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-green-300 font-semibold mb-1">✅ Healthy Status</p>
                          <p className="text-sm text-green-400/80">Your workload is well-managed and sustainable. Keep maintaining this pace!</p>
                        </div>
                      )}
                      {analysis.riskLevel === 'Moderate' && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                          <p className="text-amber-300 font-semibold mb-1">⚠️ Moderate Risk</p>
                          <p className="text-sm text-amber-400/80">Your workload is manageable but becoming stressful. Consider optimizing your time.</p>
                        </div>
                      )}
                      {analysis.riskLevel === 'High' && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <p className="text-red-300 font-semibold mb-1">🚨 High Risk</p>
                          <p className="text-sm text-red-400/80">Your burnout risk is high. Seek support and redistribute your workload immediately.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Tips Card */}
                  <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-cyan-300 mb-2">Quick Tip</h4>
                        <p className="text-sm text-cyan-400/80">
                          {analysis.riskScore >= 71 
                            ? "Prioritize your mental health. Talk to your academic advisor about your workload."
                            : analysis.riskScore >= 41
                            ? "Try breaking down large tasks into smaller, manageable chunks."
                            : "You're doing great! Keep up the good work and maintain your healthy balance."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stress Analytics Dashboard */}
              <div>
                <StressAnalyticsDashboard analysis={analysis} />
              </div>

              {/* Academic Heatmap */}
              <div>
                <AcademicHeatmap heavyDays={analysis.heavyDays} />
              </div>

              {/* Suggestions Section */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📋 Personalized Recommendations</h3>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300 text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Info */}
              <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-4 text-center">
                <p className="text-sm text-teal-300">
                  💪 Remember: Your health comes first. If you're feeling overwhelmed, reach out to your institution's support services.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BurnoutAnalysisPage;
