import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isWithinInterval,
  isBefore,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

const monthThemes: Record<number, { image: string; accent: string; accentDark: string }> = {
  0:  { image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1600', accent: '#3b82f6', accentDark: '#1d4ed8' },
  1:  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600', accent: '#8b5cf6', accentDark: '#6d28d9' },
  2:  { image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=1600', accent: '#ec4899', accentDark: '#be185d' },
  3:  { image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&q=80&w=1600', accent: '#10b981', accentDark: '#047857' },
  4:  { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600', accent: '#2563eb', accentDark: '#1e40af' },
  5:  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600', accent: '#f59e0b', accentDark: '#b45309' },
  6:  { image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600', accent: '#ef4444', accentDark: '#b91c1c' },
  7:  { image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1600', accent: '#f97316', accentDark: '#c2410c' },
  8:  { image: 'https://images.unsplash.com/photo-1680160231876-e62b4520c90c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', accent: '#84cc16', accentDark: '#4d7c0f' },
  9:  { image: 'https://images.unsplash.com/photo-1565991502019-fc726c2bf2da?q=80&w=810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', accent: '#f59e0b', accentDark: '#92400e' },
  10: { image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80&w=1600', accent: '#14b8a6', accentDark: '#0f766e' },
  11: { image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1600', accent: '#3b82f6', accentDark: '#1d4ed8' },
};

const InteractiveCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isFlipping, setIsFlipping] = useState(false);

  const theme = monthThemes[currentDate.getMonth()] ?? monthThemes[0];

  const nextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => { setCurrentDate(addMonths(currentDate, 1)); setIsFlipping(false); }, 300);
  };

  const prevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => { setCurrentDate(subMonths(currentDate, 1)); setIsFlipping(false); }, 300);
  };

  const handleDateClick = (day: Date) => {
    const { start, end } = selectedRange;
    if (!start || (start && end)) {
      setSelectedRange({ start: day, end: null });
    } else {
      if (isBefore(day, start)) {
        setSelectedRange({ start: day, end: null });
      } else {
        setSelectedRange({ start, end: day });
      }
    }
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const rows: React.ReactNode[] = [];
    let days: React.ReactNode[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'd');
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected =
          (selectedRange.start && isSameDay(day, selectedRange.start)) ||
          (selectedRange.end && isSameDay(day, selectedRange.end));
        const inRange =
          selectedRange.start &&
          selectedRange.end &&
          isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end });
        const isToday = isSameDay(day, new Date());
        const isWeekend = cloneDay.getDay() === 0 || cloneDay.getDay() === 6;
        const isRangeStart = selectedRange.start && isSameDay(day, selectedRange.start);
        const isRangeEnd = selectedRange.end && isSameDay(day, selectedRange.end);

        days.push(
          <div
            key={day.toString()}
            className={[
              'day-cell',
              !isCurrentMonth ? 'empty' : '',
              isSelected ? 'selected' : '',
              inRange ? 'in-range' : '',
              isToday ? 'today' : '',
              isRangeStart ? 'range-start' : '',
              isRangeEnd ? 'range-end' : '',
              isWeekend && isCurrentMonth && !isSelected ? 'weekend-text' : '',
            ].join(' ')}
            onClick={() => isCurrentMonth && handleDateClick(cloneDay)}
            onMouseEnter={() => setHoverDate(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="days-grid" key={day.toString()}>{days}</div>
      );
      days = [];
    }

    const todayName = format(new Date(), 'EEE').toUpperCase();

    return (
      <div className="calendar-grid-section">
        <div className="weekday-header">
          {weekDays.map(d => (
            <div 
              key={d} 
              className={`weekday ${d === todayName ? 'today-header' : ''}`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="calendar-body">{rows}</div>
      </div>
    );
  };

  const renderNotes = () => {
    const monthKey = format(currentDate, 'yyyy-MM');
    const currentNote = notes[monthKey] || '';
    return (
      <div className="notes-section">
        <div className="notes-header">Notes</div>
        <div className="notes-content">
          <textarea
            className="note-input"
            value={currentNote}
            onChange={e => setNotes({ ...notes, [monthKey]: e.target.value })}
            placeholder="Add notes..."
          />
        </div>
        <div className="selection-details">
          <div className="selection-label">Selection Details</div>
          <div className="selection-box">
            {selectedRange.start ? (
              <div className="selection-content">
                <div className="selection-dates">
                  <CalendarIcon size={12} />
                  <span>{format(selectedRange.start, 'MMM d, yyyy')}</span>
                  {selectedRange.end && (
                    <>
                      <ChevronRight size={12} />
                      <span>{format(selectedRange.end, 'MMM d, yyyy')}</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedRange({ start: null, end: null });
                    const monthKey = format(currentDate, 'yyyy-MM');
                    setNotes({ ...notes, [monthKey]: '' });
                  }}
                  className="clear-btn"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ) : (
              <p className="selection-placeholder">Select a date range on the grid</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wall-calendar-container">
      {/* Spiral Rings */}
      <div className="spiral-binding">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="spiral-ring" />
        ))}
      </div>

      <motion.div
        className="calendar-paper"
        style={{ '--primary': theme.accent, '--primary-dark': theme.accentDark } as React.CSSProperties}
        animate={{ rotateX: isFlipping ? -12 : 0, y: isFlipping ? -15 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="hero-image-wrapper">
          <motion.img
            key={currentDate.getMonth()}
            src={theme.image}
            alt="Calendar hero"
            className="hero-img"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          />

          {/* Nav controls */}
          <div className="hero-controls">
            <button className="btn-icon" onClick={prevMonth} aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <button className="btn-icon" onClick={nextMonth} aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="hero-month-label">
            <span className="hero-year">{format(currentDate, 'yyyy')}</span>
            <span className="hero-month">{format(currentDate, 'MMMM').toUpperCase()}</span>
          </div>

          <svg
            className="wave-svg"
            viewBox="0 0 1200 500"
            
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="vShapeShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.2)" />
              </filter>
              <filter id="whiteShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="-4" stdDeviation="8" floodColor="rgba(0,0,0,0.1)"/>
              </filter>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--primary-dark)" />
              </linearGradient>
            </defs>
            {/* White Covering to form the grid area and bottom V with rounded radius */}
            <path
              d="M 0,340 L 330,450 Q 420,480 510,452.3 L 1200,240 L 1200,500 L 0,500 Z"
              fill="#ffffff"
              filter="url(#whiteShadow)"
            />

            {/* Left Geometric Triangle overlay - flush with paper edge */}
            <path
              d="M 0,340 L 240,420 L 0,490 Z"
              fill="url(#waveGrad)"
              opacity="0.85"
            />
            
            {/* Right Geometric V-Shape overlay - flush with paper edge */}
            <path
              d="M 700,394 L 1200,240 L 1200,400 L 980,449 Q 850,478 800,450 L 700,394 Z"
              fill="url(#waveGrad)"
              opacity="0.85"
            />
          </svg>
        </div>

        <div className="calendar-main-content">
          {renderNotes()}
          {renderDays()}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveCalendar;
