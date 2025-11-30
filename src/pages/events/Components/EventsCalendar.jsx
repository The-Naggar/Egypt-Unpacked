import React, { useState } from "react";
import "./EventsCalendar.css";

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    { date: "2024-03-15", title: "Museum Opening", type: "cultural" },
    { date: "2024-03-20", title: "Nile Festival", type: "festival" },
    { date: "2024-03-25", title: "Crafts Workshop", type: "workshop" },
    { date: "2024-04-05", title: "Food Festival", type: "festival" },
    { date: "2024-04-15", title: "Diving Competition", type: "sports" }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      cultural: '🏛️',
      festival: '🎪',
      workshop: '🔨',
      sports: '⚽',
      concert: '🎵'
    };
    return icons[type] || '🎪';
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateString);

      days.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          <div className="day-events">
            {dayEvents.map((event, index) => (
              <div key={index} className="event-indicator" title={event.title}>
                {getEventTypeIcon(event.type)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <section className="events-calendar">
      <h2 className="calendar-title">Events Calendar</h2>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}>
            ‹
          </button>
          <h3 className="current-month">{formatMonthYear(currentDate)}</h3>
          <button className="nav-btn" onClick={() => navigateMonth(1)}>
            ›
          </button>
        </div>

        <div className="calendar-grid">
          <div className="day-header">Sun</div>
          <div className="day-header">Mon</div>
          <div className="day-header">Tue</div>
          <div className="day-header">Wed</div>
          <div className="day-header">Thu</div>
          <div className="day-header">Fri</div>
          <div className="day-header">Sat</div>
          
          {renderCalendarDays()}
        </div>
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-icon">🏛️</span>
          <span>Cultural</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🎪</span>
          <span>Festival</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🔨</span>
          <span>Workshop</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">⚽</span>
          <span>Sports</span>
        </div>
      </div>
    </section>
  );
}