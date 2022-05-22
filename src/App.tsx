import { useEffect, useState } from 'react';
import { RootStoreProvider } from './hooks';
import { Router, ThemeProvider } from './components';
import RootStore from './stores/containers/rootStore';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [rootStore, setRootStore] = useState({} as RootStore);

  const init = async () => {
    try {
      const store = new RootStore();
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
