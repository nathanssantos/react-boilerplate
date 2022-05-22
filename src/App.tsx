import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { RootStoreProvider } from './hooks';
import { Router, ThemeProvider } from './components';
import RootStore from './stores/containers/rootStore';
import api from './services/api';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [rootStore, setRootStore] = useState({} as RootStore);

  const init = async () => {
    try {
      const store = new RootStore();

      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error: AxiosError) => {
          if (error?.response?.status === 401) {
            rootStore.authStore.unauthenticate();
          }
          return error;
        },
      );

      setRootStore(store);
    } catch (e) {
      console.error(e);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!appIsReady) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

export default App;
