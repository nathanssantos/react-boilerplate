import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../hooks';

import { LoginScreen, HomeScreen } from '../../screens';

const Router = () => {
  const store = useStore();

  return (
    <BrowserRouter>
      {store.authStore.isAuthenticated ? (
        <Switch>
          <Route path='/'>
            <HomeScreen />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path='/'>
            <LoginScreen />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default observer(Router);
