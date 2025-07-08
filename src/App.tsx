import {
  Box,
  Container,
  IconButton,
  Toolbar,
  AppBar,
  Tooltip,
  Typography,
  Paper,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';
import Stats from './components/Stats';
import Progress from './pages/Progress';

type Props = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

function App({ toggleTheme, mode }: Props) {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 1 }}>
          <Tooltip title="View Progress" arrow>
            <IconButton onClick={() => navigate('/progress')} color="inherit">
              <BarChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} arrow>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper
                elevation={3}
                sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}
              >
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
                <Stats />
              </Paper>
            </Container>
          }
        />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Box>
  );
}

export default App;
