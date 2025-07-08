import { Container, Box, Button, Typography, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HabitGraph from '../components/HabitGraph';
import { motion } from 'framer-motion';

const Progress = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
            >
              Back to Tracker
            </Button>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Visualize your progress over time and track your habit completion trends.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <HabitGraph />
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Progress;
