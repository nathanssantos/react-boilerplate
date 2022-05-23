import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useStore } from '../hooks';

const Home = () => {
  const store = useStore();
  return (
    <div>
      <Button onClick={store.authStore.unauthenticate}>Logout</Button>
    </div>
  );
};

export default observer(Home);
