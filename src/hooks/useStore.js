import { createContext, useContext } from 'react';

/**
 * @type {React.Context<import('../stores/containers/RootStore').default>}
 */
const RootStoreContext = createContext({});

export const RootStoreProvider = RootStoreContext.Provider;

export const useStore = () => useContext(RootStoreContext);
