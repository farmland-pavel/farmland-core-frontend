import { AuthStore, IAuthStoreHydrationData } from './authStore';
import { UiStore, IUiStoreHydrationData } from './uiStore';

export type IRootStoreHydrationData = {
  authStoreHydrationData?: IAuthStoreHydrationData;
  uiStoreHydrationData?: IUiStoreHydrationData;
};

export class RootStore {
  authStore: AuthStore;
  uiStore: UiStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.uiStore = new UiStore(this);
  }

  hydrate(data: IRootStoreHydrationData) {
    if (data.authStoreHydrationData) {
      this.authStore.hydrate(data.authStoreHydrationData);
    }

    if (data.uiStoreHydrationData) {
      this.uiStore.hydrate(data.uiStoreHydrationData);
    }
  }
}
