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
  let totalExpected = 0;

  habits.forEach((habit) => {
    totalCompleted += habit.completedDates.length;

    const createdAt = new Date(habit.createdAt);
    const now = new Date();
    const diffTime = now.getTime() - createdAt.getTime();
    const daysSinceCreated = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let expected = 0;
    if (habit.frequency === 'daily') {
      expected = daysSinceCreated;
    } else if (habit.frequency === 'weekly') {
      expected = Math.ceil(daysSinceCreated / 7);
    } else if (habit.frequency === 'monthly') {
      expected = Math.ceil(daysSinceCreated / 30);
    }

    totalExpected += expected;
  });

  const successRate =
    totalExpected === 0
      ? 0
      : Math.min(Math.round((totalCompleted / totalExpected) * 100), 100);

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
