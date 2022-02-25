import { enableStaticRendering } from "mobx-react-lite";
import React, { FC, createContext, useContext , useMemo } from "react";
import { RootStore, IRootStoreHydrationData } from "./rootStore";

interface WindowGlobal extends Window {
  __store__?: RootStore;
}

// there is no window object on the server, escape memory leaks on server side
enableStaticRendering(typeof window === 'undefined');

// local module level variable - holds singleton store, client store
let __store__: RootStore;

const StoreContext = createContext<RootStore>(new RootStore());

StoreContext.displayName = "StoreContext";

export const useRootStore = () => useContext(StoreContext);

interface IRootStoreProviderProps {
  hydrationData?: IRootStoreHydrationData;
}

export const RootStoreProvider: FC<IRootStoreProviderProps> = (props: IRootStoreProviderProps) => {
  const { hydrationData, children } = props;

  const value = useMemo(() => initializeStore(hydrationData), [hydrationData]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

const initializeStore = (initialData?: IRootStoreHydrationData): RootStore => {
  const store = __store__ ?? new RootStore();

  if (initialData) store.hydrate(initialData);
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return store;
  // Create the store once in the client
  if (!__store__) __store__ = store;

  const windowGlobal: WindowGlobal = window;

  windowGlobal.__store__ = store;

  return store;
}
