import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../hooks';

import { Home, Login } from '../../screens';

const Router = () => {
  const store = useStore();

  return (
    <HashRouter>
      {store?.authStore?.isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </HashRouter>
  );
};

export default observer(Router);
