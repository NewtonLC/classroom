import React from 'react';
import styles from './StudentActivityChart.module.css';

const daysOfWeek = ['Mon', 'Wed', 'Fri']; // Display only a few labels like GitHub

const generateActivityData = timestamps => {
  const activityData = {};
  timestamps.forEach(timestamp => {
    const date = new Date(timestamp);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
    activityData[key] = (activityData[key] || 0) + 1;
  });
  return activityData;
};

const activityLevels = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

const getColor = count => {
  if (count === 0) return activityLevels[0];
  if (count <= 2) return activityLevels[1];
  if (count <= 5) return activityLevels[2];
  if (count <= 10) return activityLevels[3];
  return activityLevels[4];
};

const getPreviousYearDate = date => {
  const previousYearDate = new Date(date);
  previousYearDate.setFullYear(date.getFullYear() - 1);
  return previousYearDate;
};

const StudentActivityChart = ({ timestamps }) => {
  const activityData = generateActivityData(timestamps);

  const today = new Date();
  const startDate = getPreviousYearDate(today);

  // Increment today to the next day to include today's activity
  today.setDate(today.getDate() + 1);

  const weeks = [];
  let firstWeek = [];
  const startDay = startDate.getDay();

  // Fill the first week with the correct dates
  for (let i = 0; i < startDay; i++) {
    firstWeek.push({ date: null, count: 0 });
  }

  let chart_cutoff = false;
  for (let i = 0; i < 54; i++) {
    const week = i === 0 ? firstWeek : [];
    if (chart_cutoff) {
      break;
    }
    for (let j = week.length; j < 7; j++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i * 7 + j - startDay);
      if (date.toDateString() === today.toDateString()) {
        chart_cutoff = true;
        break;
      }
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
      week.push({ date, count: activityData[key] || 0 });
    }
    weeks.push(week);
  }

  return (
    <div className={styles.chart}>
      <div className={styles.dayLabels}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {weeks.map((week, index) => (
          <div key={index} className={styles.week}>
            {week.map((day, index) =>
              day.date ? (
                <div
                  key={index}
                  className={styles.day}
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${day.date.toDateString()}: ${day.count} completions`}
                ></div>
              ) : (
                <div key={index} className={styles.dayEmpty}></div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentActivityChart;
