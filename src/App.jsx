import React, { useEffect, useState } from 'react';

import createRootStore from './stores/createRootStore';
import { RootStoreProvider } from './hooks';
import { Router } from './components';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [rootStore, setRootStore] = useState(null);

  const init = async () => {
    try {
      const store = await createRootStore();
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
      <Router />
    </RootStoreProvider>
  );
};

export default App;
