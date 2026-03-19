import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AcademicHeatmap = ({ heavyDays }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const currentYear = currentMonth.getFullYear();
  const currentMonthNum = currentMonth.getMonth();
  const monthName = new Date(currentYear, currentMonthNum).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const totalDays = daysInMonth(currentMonth);
  const startingDayOfWeek = firstDayOfMonth(currentMonth);

  // Create map of heavy days by date string
  const heavyDaysMap = useMemo(() => {
    const map = {};
    if (heavyDays) {
      heavyDays.forEach(day => {
        map[day.date] = day.hours;
      });
    }
    return map;
  }, [heavyDays]);

  // Get color intensity based on workload
  const getHeatColor = (hours) => {
    if (!hours) return 'bg-slate-700/20 border-slate-600/30 hover:bg-slate-700/30';
    if (hours <= 5) return 'bg-lime-500/30 border-lime-500/40 hover:bg-lime-500/40 text-lime-200';
    if (hours <= 10) return 'bg-yellow-500/30 border-yellow-500/40 hover:bg-yellow-500/40 text-yellow-200';
    if (hours <= 15) return 'bg-orange-500/30 border-orange-500/40 hover:bg-orange-500/40 text-orange-200';
    return 'bg-red-500/40 border-red-500/50 hover:bg-red-500/50 text-red-200';
  };

  const getHeatLabel = (hours) => {
    if (!hours) return 'No tasks';
    if (hours <= 5) return 'Light';
    if (hours <= 10) return 'Moderate';
    if (hours <= 15) return 'Heavy';
    return 'Very Heavy';
  };

  // Generate calendar grid
  const calendarDays = [];
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthNum - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthNum + 1));
  };

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Academic Workload Calendar</h3>
            <p className="text-sm text-slate-400">Visual representation of your workload</p>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6 px-2">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-slate-700/30 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400 hover:text-slate-200" />
        </button>
        <h4 className="text-lg font-bold text-white">{monthName}</h4>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-slate-700/30 rounded-lg transition"
        >
          <ChevronRight className="w-5 h-5 text-slate-400 hover:text-slate-200" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }

          const dateStr = `${currentYear}-${String(currentMonthNum + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hours = heavyDaysMap[dateStr];
          const heatColor = getHeatColor(hours);
          const heatLabel = getHeatLabel(hours);

          return (
            <div
              key={day}
              className={`aspect-square rounded-lg border ${heatColor} flex flex-col items-center justify-center p-1 transition-all cursor-pointer group`}
            >
              <span className="text-sm font-bold text-slate-200">{day}</span>
              {hours && <span className="text-xs text-slate-300 font-semibold">{hours}h</span>}
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 border border-slate-700 rounded-lg p-2 whitespace-nowrap text-xs text-slate-300 z-10">
                {heatLabel}
                {hours && ` - ${hours} hours`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4">
        <p className="text-sm font-bold text-slate-300 mb-3">Workload Intensity</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-500/40 rounded-full"></div>
            <span className="text-xs text-slate-400">Light (1-5h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/40 rounded-full"></div>
            <span className="text-xs text-slate-400">Moderate (6-10h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500/40 rounded-full"></div>
            <span className="text-xs text-slate-400">Heavy (11-15h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/40 rounded-full"></div>
            <span className="text-xs text-slate-400">Very Heavy (15h+)</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-slate-400 text-center mt-4">
        💡 Darker colors indicate heavier workload days. Plan accordingly!
      </p>
    </div>
  );
};

AcademicHeatmap.propTypes = {
  heavyDays: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    hours: PropTypes.number
  }))
};

export default AcademicHeatmap;
