import { RootStoreProvider } from './hooks';
import { Router, ThemeProvider } from './components';
import RootStore from './stores/rootStore';

const store = new RootStore();

const App = () => {
  return (
    <RootStoreProvider value={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

export default App;
