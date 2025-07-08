import { Box, Typography, Paper } from '@mui/material';
import { useHabitStore } from '../store/store';
import StatBox from './StatBox';

const Stats = () => {
  const { habits } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  const totalHabits = habits.length;
  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;

  let totalCompleted = 0;
  let totalPossible = 0;

  habits.forEach((habit) => {
    totalCompleted += habit.completedDates.length;

    const createdAt = new Date(habit.createdAt);
    const daysSinceCreated =
      (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    totalPossible += Math.floor(daysSinceCreated) + 1;
  });

  const successRate =
    totalPossible > 0
      ? Math.round((totalCompleted / totalPossible) * 100)
      : 0;

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
        📊 Your Habit Stats
      </Typography>

      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          p: 3,
          borderRadius: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : '#f5f5f5',
        }}
      >
        <StatBox label="Total Habits" value={totalHabits} />
        <StatBox label="Completed Today" value={completedToday} />
        <StatBox label="Success Rate" value={`${successRate}%`} />
      </Paper>
    </Box>
  );
};

export default Stats;
