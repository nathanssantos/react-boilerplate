import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useStore } from '../../hooks';

const Home = () => {
  const store = useStore();

  return (
    <Box padding={4}>
      <Button
        variant="contained"
        onClick={() => {
          store.authStore.unauthenticate();
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Home;
