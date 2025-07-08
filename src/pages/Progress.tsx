import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HabitGraph from '../components/HabitGraph';

const Progress = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={2} textAlign="right">
        <Button variant="outlined" onClick={() => navigate('/')}>
          ← Back to Tracker
        </Button>
      </Box>
      <HabitGraph />
    </Container>
  );
};

export default Progress;
