import { useHabitStore, type Habit } from '../store/store';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];
  const theme = useTheme();

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  if (habits.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mt={4}
      >
        No habits added yet. Start by creating one!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
      {habits.map((habit) => {
        const streak = getStreak(habit);
        const progressValue = Math.min((streak / 30) * 100, 100); // cap at 100%

        return (
          <Paper
            key={habit.id}
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                >
                  {habit.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {habit.frequency}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <Button
                  variant={
                    habit.completedDates.includes(today)
                      ? 'contained'
                      : 'outlined'
                  }
                  color={
                    habit.completedDates.includes(today) ? 'success' : 'primary'
                  }
                  onClick={() => toggleHabit(habit.id, today)}
                  startIcon={<CheckCircleIcon />}
                >
                  {habit.completedDates.includes(today)
                    ? 'Completed'
                    : 'Mark Complete'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeHabit(habit.id)}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
            </Box>

            {/* Progress bar section */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Current Streak: <strong>{streak}</strong> day
                {streak !== 1 ? 's' : ''}
              </Typography>

              <Tooltip title={`${streak}/30 days`} arrow>
                <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? '#333'
                        : theme.palette.grey[300],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitList;
