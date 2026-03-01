import { AlertTriangle, Zap, Activity } from 'lucide-react';
import PropTypes from 'prop-types';

const BurnoutMeter = ({ riskScore, riskLevel }) => {
  // Determine colors based on risk level
  const getColors = () => {
    if (riskLevel === 'Low') {
      return {
        bg: 'from-green-500/10 to-emerald-500/10',
        border: 'border-green-500/30',
        circle: 'stroke-green-500',
        text: 'text-green-400',
        icon: 'text-green-400',
        label: 'text-green-300'
      };
    } else if (riskLevel === 'Moderate') {
      return {
        bg: 'from-amber-500/10 to-orange-500/10',
        border: 'border-amber-500/30',
        circle: 'stroke-amber-500',
        text: 'text-amber-400',
        icon: 'text-amber-400',
        label: 'text-amber-300'
      };
    } else {
      return {
        bg: 'from-red-500/10 to-orange-500/10',
        border: 'border-red-500/30',
        circle: 'stroke-red-500',
        text: 'text-red-400',
        icon: 'text-red-400',
        label: 'text-red-300'
      };
    }
  };

  const colors = getColors();
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className={`bg-linear-to-br ${colors.bg} border ${colors.border} rounded-2xl p-8 shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Burnout Risk</h3>
          <p className="text-sm text-slate-400">Stress level indicator</p>
        </div>
        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${
          riskLevel === 'Low' 
            ? 'from-green-500 to-emerald-600' 
            : riskLevel === 'Moderate'
            ? 'from-amber-500 to-orange-600'
            : 'from-red-500 to-orange-600'
        } flex items-center justify-center`}>
          {riskLevel === 'Low' ? (
            <Activity className={`w-5 h-5 text-white`} />
          ) : (
            <AlertTriangle className={`w-5 h-5 text-white`} />
          )}
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="rgba(100, 116, 139, 0.2)"
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              className={colors.circle}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-4xl font-black ${colors.text}`}>{riskScore}</p>
            <p className={`text-xs font-bold uppercase ${colors.label}`}>{riskLevel}</p>
          </div>
        </div>
      </div>

      {/* Risk Level Description */}
      <div className={`bg-slate-700/30 border ${colors.border} rounded-xl p-4 text-center`}>
        <p className={`font-semibold ${colors.text} mb-1`}>
          {riskLevel === 'Low' && '✅ Healthy workload'}
          {riskLevel === 'Moderate' && '⚠️ Manageable but stressful'}
          {riskLevel === 'High' && '🚨 High burnout risk'}
        </p>
        <p className="text-xs text-slate-400">
          {riskLevel === 'Low' && 'Your academic workload is well-balanced.'}
          {riskLevel === 'Moderate' && 'Consider organizing your tasks better.'}
          {riskLevel === 'High' && 'Seek support from advisors or peers.'}
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-slate-400 mb-1">Low</p>
          <p className="text-sm font-bold text-green-400">0–40</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Moderate</p>
          <p className="text-sm font-bold text-amber-400">41–70</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">High</p>
          <p className="text-sm font-bold text-red-400">71–100</p>
        </div>
      </div>
    </div>
  );
};

BurnoutMeter.propTypes = {
  riskScore: PropTypes.number.isRequired,
  riskLevel: PropTypes.oneOf(['Low', 'Moderate', 'High']).isRequired
};

export default BurnoutMeter;
