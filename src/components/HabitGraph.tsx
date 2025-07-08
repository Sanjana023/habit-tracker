import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Box,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';
import { useHabitStore } from '../store/store';

const COLORS = ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#ef5350', '#26c6da'];

const HabitGraph = () => {
  const { habits } = useHabitStore();
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getWeekNumber = (d: Date) => {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - start.getTime()) / 86400000);
    return Math.ceil((days + start.getDay() + 1) / 7);
  };

  const generateData = () => {
    const today = new Date();
    let range = 7;
    let labelFormat = (d: Date) => d.toISOString().split('T')[0];

    if (view === 'weekly') {
      range = 4;
      labelFormat = (d) => `W${getWeekNumber(d)}-${d.getFullYear().toString().slice(-2)}`;
    } else if (view === 'monthly') {
      range = 6;
      labelFormat = (d) =>
        `${d.toLocaleString('default', { month: 'short' })} '${d.getFullYear().toString().slice(-2)}`;
    }

    const dateBuckets = [...Array(range)].map((_, i) => {
      const date = new Date();
      if (view === 'daily') date.setDate(today.getDate() - (range - 1 - i));
      else if (view === 'weekly') date.setDate(today.getDate() - (7 * (range - 1 - i)));
      else if (view === 'monthly') date.setMonth(today.getMonth() - (range - 1 - i));

      return {
        label: labelFormat(date),
        count: 0,
        rawDate: date,
      };
    });

    for (const habit of habits) {
      for (const dateString of habit.completedDates) {
        const completedDate = new Date(dateString);

        dateBuckets.forEach((bucket) => {
          if (view === 'daily') {
            if (dateString === bucket.rawDate.toISOString().split('T')[0]) {
              bucket.count += 1;
            }
          } else if (view === 'weekly') {
            if (
              getWeekNumber(completedDate) === getWeekNumber(bucket.rawDate) &&
              completedDate.getFullYear() === bucket.rawDate.getFullYear()
            ) {
              bucket.count += 1;
            }
          } else if (view === 'monthly') {
            if (
              completedDate.getMonth() === bucket.rawDate.getMonth() &&
              completedDate.getFullYear() === bucket.rawDate.getFullYear()
            ) {
              bucket.count += 1;
            }
          }
        });
      }
    }

    return dateBuckets.map(({ label, count }) => ({ label, count }));
  };

  const data = generateData();

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
        📊 Habit Completion Overview
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_e, newView) => newView && setView(newView)}
          size="small"
          color="primary"
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 360 }}>
        {data.every((d) => d.count === 0) ? (
          <Typography textAlign="center" color="text.secondary" mt={10}>
            No habits completed in this view range.
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Bar
                dataKey="count"
                radius={[5, 5, 0, 0]}
                animationDuration={800}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Box>
  );
};

export default HabitGraph;
