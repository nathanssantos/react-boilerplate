import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Spinner } from '@chakra-ui/react';
import { useStore } from '../hooks';
import { Home, Login } from '../screens';

const Router = () => {
  const store = useStore();

  const renderRoutes = () => {
    if (store.authStore.getMeStatus === 'fetching') {
      return <Spinner />;
    }

    if (store.authStore.isAuthenticated) {
      return (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    );
  };

  return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default observer(Router);
