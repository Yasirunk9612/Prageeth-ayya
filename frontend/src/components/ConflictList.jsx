import { AlertTriangle, Clock, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const ConflictList = ({ collisions, heavyDays }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get priority badge style
  const getPriorityStyle = (priority) => {
    if (priority === 'High') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (priority === 'Medium') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-green-500/20 text-green-300 border-green-500/30';
  };

  // Check if there are any conflicts
  const hasConflicts = collisions?.length > 0 || heavyDays?.length > 0;

  if (!hasConflicts) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Conflicts Detected</h3>
        <p className="text-slate-400">Your schedule looks healthy! Keep up the good work.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Deadline Conflicts</h2>
          <p className="text-sm text-slate-400">Review and manage your workload</p>
        </div>
      </div>

      {/* Same-Day Collisions */}
      {collisions?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-300">Same-Day Conflicts</h3>
            <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-lg">
              {collisions.length}
            </span>
          </div>

          {collisions.map((collision, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-5 hover:border-red-500/50 transition"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-bold">{formatDate(collision.date)}</p>
                    <p className="text-red-300 text-sm">{collision.taskCount} deadlines on same day</p>
                  </div>
                </div>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                {collision.tasks.map((task, taskIndex) => (
                  <div 
                    key={taskIndex}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 flex items-start justify-between"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <BookOpen className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{task.title}</p>
                        <p className="text-slate-400 text-xs mt-1">{task.module}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{task.workloadHours}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Heavy Days (>10 hours) */}
      {heavyDays?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-orange-300">Daily Overload</h3>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-bold rounded-lg">
              {heavyDays.length}
            </span>
          </div>

          {heavyDays.map((day, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-5 hover:border-orange-500/50 transition"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white font-bold">{formatDate(day.date)}</p>
                    <p className="text-orange-300 text-sm">
                      {day.totalHours} hours workload ({day.overloadPercentage}% of limit)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-orange-400">{day.totalHours}h</p>
                  <p className="text-xs text-orange-300">{day.taskCount} tasks</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, day.overloadPercentage)}%` }}
                ></div>
              </div>

              {/* Tasks Summary */}
              <div className="grid grid-cols-2 gap-2">
                {day.tasks.slice(0, 4).map((task, taskIndex) => (
                  <div 
                    key={taskIndex}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-2"
                  >
                    <p className="text-white text-xs font-medium truncate">{task.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-xs border ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-slate-400">{task.workloadHours}h</span>
                    </div>
                  </div>
                ))}
              </div>
              {day.tasks.length > 4 && (
                <p className="text-xs text-slate-400 mt-2 text-center">
                  +{day.tasks.length - 4} more task(s)
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Warning Footer */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-sm text-purple-300">
          💡 <span className="font-semibold">Recommendation:</span> Consider redistributing tasks across multiple days 
          or adjusting deadlines to reduce workload pressure and prevent burnout.
        </p>
      </div>
    </div>
  );
};

ConflictList.propTypes = {
  collisions: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    taskCount: PropTypes.number,
    tasks: PropTypes.array
  })),
  heavyDays: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    totalHours: PropTypes.number,
    taskCount: PropTypes.number,
    overloadPercentage: PropTypes.number,
    tasks: PropTypes.array
  }))
};

export default ConflictList;
