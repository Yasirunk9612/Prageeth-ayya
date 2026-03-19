import { Clock, TrendingUp, AlertTriangle, CheckCircle2, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const WeeklyWorkloadCard = ({ analysis }) => {
  const weeklyLoad = analysis?.weeklyLoad || 0;
  const healthScore = analysis?.analysis?.healthScore || 100;
  const heavyDays = analysis?.heavyDays || [];
  const warnings = analysis?.warnings || [];

  // Calculate workload percentage (based on 25h healthy limit)
  const workloadPercentage = Math.min(100, Math.round((weeklyLoad / 25) * 100));
  
  // Determine status color
  const getStatusColor = () => {
    if (weeklyLoad <= 15) return { bg: 'from-green-500/20 to-emerald-500/20', text: 'text-green-400', border: 'border-green-500/30' };
    if (weeklyLoad <= 25) return { bg: 'from-amber-500/20 to-yellow-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
    return { bg: 'from-red-500/20 to-orange-500/20', text: 'text-red-400', border: 'border-red-500/30' };
  };

  const statusColor = getStatusColor();

  // Get health status
  const getHealthStatus = () => {
    if (healthScore >= 80) return { label: 'Excellent', color: 'text-green-400', icon: CheckCircle2 };
    if (healthScore >= 60) return { label: 'Good', color: 'text-amber-400', icon: TrendingUp };
    if (healthScore >= 40) return { label: 'Warning', color: 'text-orange-400', icon: AlertTriangle };
    return { label: 'Critical', color: 'text-red-400', icon: AlertTriangle };
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Weekly Workload</h3>
            <p className="text-xs text-slate-400">Current week overview</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${statusColor.border} ${statusColor.bg}`}>
          <span className={statusColor.text}>
            {weeklyLoad <= 15 ? 'Light' : weeklyLoad <= 25 ? 'Moderate' : 'Heavy'}
          </span>
        </div>
      </div>

      {/* Workload Display */}
      <div className="mb-6">
        <div className="flex items-end gap-2 mb-2">
          <p className="text-4xl font-black text-white">{weeklyLoad}</p>
          <p className="text-lg text-slate-400 mb-1">/ 25 hours</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${
              workloadPercentage <= 60 
                ? 'from-green-500 to-emerald-500' 
                : workloadPercentage <= 100 
                ? 'from-amber-500 to-orange-500' 
                : 'from-red-500 to-pink-500'
            } transition-all duration-500`}
            style={{ width: `${workloadPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 mt-2">{workloadPercentage}% of recommended limit</p>
      </div>

      {/* Health Score */}
      <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HealthIcon className={`w-5 h-5 ${healthStatus.color}`} />
            <div>
              <p className="text-xs text-slate-400">Health Score</p>
              <p className={`text-lg font-bold ${healthStatus.color}`}>{healthStatus.label}</p>
            </div>
          </div>
          <p className="text-3xl font-black text-white">{healthScore}</p>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2 mb-4">
          {warnings.slice(0, 2).map((warning, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border flex items-start gap-3 ${
                warning.severity === 'critical' 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : warning.severity === 'high'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                warning.severity === 'critical' ? 'text-red-400' : 'text-orange-400'
              }`} />
              <p className={`text-xs ${
                warning.severity === 'critical' ? 'text-red-300' : 'text-orange-300'
              }`}>
                {warning.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Heavy Days Count */}
      {heavyDays.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <p className="text-sm text-orange-300">
              <span className="font-bold">{heavyDays.length}</span> day(s) exceed 10-hour limit
            </p>
          </div>
        </div>
      )}

      {/* Tip */}
      {weeklyLoad > 25 && (
        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-xs text-purple-300">
            💡 <span className="font-semibold">Tip:</span> Consider delegating or postponing low-priority tasks
          </p>
        </div>
      )}
    </div>
  );
};

WeeklyWorkloadCard.propTypes = {
  analysis: PropTypes.shape({
    weeklyLoad: PropTypes.number,
    heavyDays: PropTypes.array,
    warnings: PropTypes.array,
    analysis: PropTypes.shape({
      healthScore: PropTypes.number
    })
  })
};

export default WeeklyWorkloadCard;
