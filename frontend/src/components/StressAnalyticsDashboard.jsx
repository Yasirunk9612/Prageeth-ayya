import { Clock, AlertTriangle, TrendingUp, Calendar, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

const StressAnalyticsDashboard = ({ analysis }) => {
  const riskScore = analysis?.riskScore || 0;
  const weeklyLoad = analysis?.weeklyLoad || 0;
  const heavyDaysCount = analysis?.heavyDaysCount || 0;
  const collisionCount = analysis?.collisionCount || 0;
  const taskDensity = analysis?.taskDensity || 0;
  const consecutiveHeavyDays = analysis?.consecutiveHeavyDays || 0;

  // Get warning color based on risk
  const getWarningIntensity = (count, threshold) => {
    if (count === 0) return 'bg-green-500/10 border-green-500/30 text-green-300';
    if (count <= threshold / 2) return 'bg-amber-500/10 border-amber-500/30 text-amber-300';
    return 'bg-red-500/10 border-red-500/30 text-red-300';
  };

  const statCards = [
    {
      icon: Clock,
      label: 'Weekly Workload',
      value: `${weeklyLoad}h`,
      subtext: 'of 25h recommended',
      color: weeklyLoad <= 25 ? 'from-cyan-500 to-blue-600' : 'from-orange-500 to-red-600',
      textColor: weeklyLoad <= 25 ? 'text-cyan-400' : 'text-orange-400',
      bgColor: weeklyLoad <= 25 ? 'bg-cyan-500/10' : 'bg-red-500/10'
    },
    {
      icon: AlertTriangle,
      label: 'Collision Days',
      value: collisionCount,
      subtext: 'days with 3+ deadlines',
      color: collisionCount === 0 ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-600',
      textColor: collisionCount === 0 ? 'text-green-400' : 'text-red-400',
      bgColor: collisionCount === 0 ? 'bg-green-500/10' : 'bg-red-500/10'
    },
    {
      icon: Zap,
      label: 'Task Density',
      value: taskDensity,
      subtext: 'tasks this week',
      color: taskDensity <= 4 ? 'from-purple-500 to-pink-600' : 'from-orange-500 to-red-600',
      textColor: taskDensity <= 4 ? 'text-purple-400' : 'text-orange-400',
      bgColor: taskDensity <= 4 ? 'bg-purple-500/10' : 'bg-orange-500/10'
    },
    {
      icon: TrendingUp,
      label: 'Consecutive Heavy Days',
      value: consecutiveHeavyDays,
      subtext: 'days in a row',
      color: consecutiveHeavyDays <= 1 ? 'from-blue-500 to-cyan-600' : 'from-red-500 to-orange-600',
      textColor: consecutiveHeavyDays <= 1 ? 'text-blue-400' : 'text-red-400',
      bgColor: consecutiveHeavyDays <= 1 ? 'bg-blue-500/10' : 'bg-red-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} border ${stat.bgColor.includes('green') ? 'border-green-500/30' : stat.bgColor.includes('purple') ? 'border-purple-500/30' : stat.bgColor.includes('blue') ? 'border-blue-500/30' : stat.bgColor.includes('cyan') ? 'border-cyan-500/30' : 'border-orange-500/30 lg:border-red-500/30'} rounded-2xl p-6 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <div className={`bg-linear-to-br ${stat.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly Load Breakdown */}
      <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            Weekly Workload Distribution
          </h3>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
            weeklyLoad <= 15 ? 'bg-green-500/20 text-green-300' :
            weeklyLoad <= 25 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {weeklyLoad <= 15 ? 'Light' : weeklyLoad <= 25 ? 'Moderate' : 'Heavy'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-end justify-between mb-2">
            <p className="text-2xl font-black text-white">{weeklyLoad}h</p>
            <p className="text-sm text-slate-400">/ 25h (healthy)</p>
          </div>
          <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${
                weeklyLoad <= 15 ? 'from-green-500 to-emerald-500' :
                weeklyLoad <= 25 ? 'from-amber-500 to-orange-500' :
                'from-red-500 to-pink-500'
              } transition-all duration-500`}
              style={{ width: `${Math.min(100, (weeklyLoad / 25) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {Math.round((weeklyLoad / 25) * 100)}% of recommended limit
          </p>
        </div>

        {/* Daily Average */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/30">
          <div>
            <p className="text-xs text-slate-400 mb-1">Avg Daily</p>
            <p className="text-xl font-bold text-cyan-400">{analysis?.analysis?.averageDailyLoad || 0}h</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Peak Day</p>
            <p className="text-xl font-bold text-orange-400">
              {analysis?.analysis?.peakWorkloadDay ? 
                new Date(analysis.analysis.peakWorkloadDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : 'N/A'
              }
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Health Score</p>
            <p className="text-xl font-bold text-green-400">{analysis?.analysis?.healthScore || 0}</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Alerts</h3>
        
        {weeklyLoad > 25 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Heavy Workload</p>
                <p className="text-sm text-red-400/80">Your weekly load ({weeklyLoad}h) exceeds 25 hours</p>
              </div>
            </div>
          </div>
        )}

        {collisionCount > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-300">Deadline Collisions</p>
                <p className="text-sm text-orange-400/80">You have {collisionCount} day(s) with multiple deadlines</p>
              </div>
            </div>
          </div>
        )}

        {consecutiveHeavyDays > 2 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Consecutive Heavy Days</p>
                <p className="text-sm text-red-400/80">{consecutiveHeavyDays} heavy days in a row detected</p>
              </div>
            </div>
          </div>
        )}

        {heavyDaysCount > 2 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">Multiple Heavy Days</p>
                <p className="text-sm text-amber-400/80">{heavyDaysCount} day(s) this week exceed 10 hours</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StressAnalyticsDashboard.propTypes = {
  analysis: PropTypes.shape({
    riskScore: PropTypes.number,
    weeklyLoad: PropTypes.number,
    heavyDaysCount: PropTypes.number,
    collisionCount: PropTypes.number,
    taskDensity: PropTypes.number,
    consecutiveHeavyDays: PropTypes.number,
    analysis: PropTypes.shape({
      averageDailyLoad: PropTypes.number,
      peakWorkloadDay: PropTypes.string,
      healthScore: PropTypes.number
    })
  })
};

export default StressAnalyticsDashboard;
