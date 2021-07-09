import React from 'react';
import { Button } from '@material-ui/core';

import { useStore } from '../../hooks';

import './styles.scss';

const HomeScreen = () => {
  const store = useStore();

  const logout = () => {
    store.authStore.unauthenticate();
  };

  return (
    <div className='screen home-screen'>
      Home
      <Button className='bt-logout' onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default HomeScreen;
