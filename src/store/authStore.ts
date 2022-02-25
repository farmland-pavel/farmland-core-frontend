import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
import type { RootStore } from './rootStore';
import isUndefined from 'lodash/isUndefined';

export interface IUser {
  firstName?: string;
  lastName?: string;
}

export type IAuthStoreHydrationData = {
  accessToken?: string;
  user: IUser;
};

export class AuthStore {
  rootStore: RootStore;
  accessToken?: string;
  user?: IUser = undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore;
  }

  get userFullName() {
    return isUndefined(this.user) ? '' : [this.user.firstName, this.user.lastName].join(' ');
  }

  login(accessToken: string) {
    this.accessToken = accessToken;
    this.user = jwtDecode(accessToken);
  }

  logout() {
    this.accessToken = undefined;
    this.user = undefined;
  }

  hydrate(data: IAuthStoreHydrationData) {
    const { accessToken, user } = data;

    this.accessToken = accessToken;
    this.user = user;
  }
}
