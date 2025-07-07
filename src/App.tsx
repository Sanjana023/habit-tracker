import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

function App({ toggleTheme, mode }: Props) {
  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              🧠 Habit Tracker
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Build healthy habits and track your progress daily.
            </Typography>
          </Box>

          <AddHabitForm />
          <HabitList />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
