import { useHabitStore } from './store/store';
import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
 
function App() {
 const store = useHabitStore();
 console.log(store);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: { xs: '2rem', sm: '3rem' },
              color: 'primary.main',
            }}
          >
            🧠 Habit Tracker
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Build healthy habits and track your progress daily.
          </Typography>
        </Box>

        <Box mb={3}>
          <AddHabitForm />
        </Box>

        <Divider sx={{ my: 3 }} />

        <HabitList />
      </Paper>
    </Container>
  );
}

export default App;
