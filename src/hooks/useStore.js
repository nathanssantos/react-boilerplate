import { createContext, useContext } from 'react';

const RootStoreContext = createContext({});

export const RootStoreProvider = RootStoreContext.Provider;

export const useStore = () => useContext(RootStoreContext);
