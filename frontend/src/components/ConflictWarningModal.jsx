import { X, AlertTriangle, Clock, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const ConflictWarningModal = ({ isOpen, onClose, conflicts, onProceed }) => {
  if (!isOpen) return null;

  const hasSameDayConflict = conflicts?.sameDayTasks >= 3;
  const hasDailyOverload = conflicts?.hasDailyOverload;
  const warnings = conflicts?.warnings || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Deadline Collision Detected</h3>
            <p className="text-sm text-slate-400">Review before proceeding</p>
          </div>
        </div>

        {/* Warnings */}
        <div className="space-y-3 mb-6">
          {warnings.map((warning, index) => (
            <div 
              key={index}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-medium">{warning.message}</p>
                <p className="text-red-400/70 text-sm mt-1">
                  {warning.type === 'collision' && 'Consider rescheduling or reducing workload'}
                  {warning.type === 'overload' && 'This may lead to burnout and stress'}
                </p>
              </div>
            </div>
          ))}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <p className="text-xs text-slate-400">Same Day Tasks</p>
              </div>
              <p className="text-2xl font-bold text-orange-400">{conflicts?.sameDayTasks || 0}</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-red-400" />
                <p className="text-xs text-slate-400">Total Hours</p>
              </div>
              <p className="text-2xl font-bold text-red-400">{conflicts?.totalHours || 0}h</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-white font-semibold rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onProceed();
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition shadow-lg"
          >
            Proceed Anyway
          </button>
        </div>

        {/* Advice */}
        <p className="text-xs text-slate-400 text-center mt-4">
          ⚡ Tip: Distribute your workload across multiple days for better productivity
        </p>
      </div>
    </div>
  );
};

ConflictWarningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  conflicts: PropTypes.shape({
    sameDayTasks: PropTypes.number,
    totalHours: PropTypes.number,
    hasDailyOverload: PropTypes.bool,
    warnings: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      message: PropTypes.string
    }))
  }),
  onProceed: PropTypes.func.isRequired
};

export default ConflictWarningModal;
