import { makeAutoObservable } from "mobx";
import { computedFn } from 'mobx-utils';
import type { RootStore } from './rootStore';

export type IUiStoreHydrationData = {
  modals: string[];
  toasts: string[];
  isAppNavCollapsed: boolean;
};

export class UiStore {
  rootStore: RootStore;
  modals: string[] = [];
  toasts: string[] = [];
  isAppNavCollapsed = true;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore;
  }
  
  isModalOpen = computedFn((modalId: string) => {
    return this.modals.some((modal) => modal === modalId);
  })

  openModal(modalId: string) {
    this.modals = [...this.modals, modalId];
  }

  closeModal(modalId: string) {
    this.modals = this.modals.filter((modal) => modal !== modalId);
  }

  showToast() {
    
  }

  toggleAppNav(nextIsCollapsed = !this.isAppNavCollapsed) {
    this.isAppNavCollapsed = nextIsCollapsed;
  }

  hydrate(data: IUiStoreHydrationData) {
    const { modals } = data;

    this.modals = modals;
  }
}
