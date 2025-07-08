import { Paper, Typography } from '@mui/material';

type StatBoxProps = {
  label: string;
  value: string | number;
};

const StatBox = ({ label, value }: StatBoxProps) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 2,
      minWidth: 120,
      minHeight: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <Typography variant="h5" color="primary" fontWeight={600}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export default StatBox;
