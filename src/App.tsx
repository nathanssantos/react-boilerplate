import { useEffect, useState } from 'react';
import { RootStoreProvider } from './hooks';
import { Router, ThemeProvider } from './components';
import RootStore from './stores/containers/rootStore';

const App = () => {
  const [rootStore, setRootStore] = useState({} as RootStore);
  const [appIsReady, setAppIsReady] = useState(false);

  const init = async () => {
    try {
      const store = new RootStore();
      setRootStore(store);
    } catch (error) {
      console.error(error);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    if (!appIsReady) init();
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
