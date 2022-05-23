import { createContext, useContext } from 'react';
import RootStore from '../stores/rootStore';

const RootStoreContext = createContext({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStore = () => useContext(RootStoreContext);
