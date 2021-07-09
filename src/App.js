/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { flowResult } from 'mobx';
import { wrapRoot } from 'mobx-easy';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer } from 'react-toastify';

import RootStore from './stores/containers/rootStore';
import baseAPI from './services/baseAPI';

import { RootStoreProvider /* , useLocalStorage */ } from './hooks';

import { Router, ThemeProvider } from './components';

const App = () => {
  const [rootStore, setRootStore] = useState(null);
  // const [token] = useLocalStorage('token');

  const init = async () => {
    const newRootStore = wrapRoot({ RootStore, env: baseAPI });
    setRootStore(newRootStore);

    // Login automático
    // if (token?.length) {
    //   await flowResult(newRootStore.authStore.authenticate({ token }));
    // }
  };

  useEffect(() => {
    init();
  }, []);

  if (!rootStore) return null;

  return (
    <div className='app'>
      <RootStoreProvider value={rootStore}>
        <ThemeProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router />
            <ToastContainer />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </RootStoreProvider>
    </div>
  );
};

export default App;
