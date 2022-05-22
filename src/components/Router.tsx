import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../hooks';
import { Home, Login } from '../screens';

const Router = () => {
  const store = useStore();

  return (
    <BrowserRouter>
      {store?.authStore?.isAuthenticated ? (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default observer(Router);
