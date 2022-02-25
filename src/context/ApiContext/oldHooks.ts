import { useRef } from 'react';
import merge from 'lodash/merge';
import isUndefined from 'lodash/isUndefined';
import type { IApiClient, IApiClientError, IApiClientConfig } from 'src/services/ApiClient';
import type { RootStore } from 'src/store/rootStore';

interface IUseRequestProps {
  client: IApiClient;
  store: RootStore;
}

interface IQueuedRequest {
  promise: Promise<any>,
  resolve: (config: IApiClientConfig) => void;
  config: IApiClientConfig;
}

export const useRequest = (props: IUseRequestProps) => {
  const { client, store } = props;
  const isRefreshingToken = useRef<boolean>(false);
  const queuedRequests = useRef<IQueuedRequest[]>([]);

  const getExtraConfig = () => {
    let extraConfig = {};
  
    const { accessToken } = store.authStore;
  
    if (!isUndefined(accessToken)) extraConfig = merge(extraConfig, { headers: { Authorization: `Bearer ${accessToken}`} });
  
    return extraConfig;
  }

  const handleRefreshToken = async () => {
    isRefreshingToken.current = true;
  
    const result = await client<{accessToken: string}>({ method: 'POST', url: '/auth/refresh' }).catch((error: IApiClientError) => error);

    if (result instanceof Error) console.log('log error of refreshing token');

    if (!(result instanceof Error)) store.authStore.login(result.data.accessToken);

    isRefreshingToken.current = false;
  }

  const releaseQueuedRequests = () => {
    queuedRequests.current.forEach((req) => req.resolve(req.config));
    queuedRequests.current = [];
  };

  const request = async <IData>(config: IApiClientConfig) => {
    const putInQueue = () => {
      const promise = new Promise((resolve) => {
        queuedRequests.current = [...queuedRequests.current, { promise, resolve, config, }];
      }).then((config: any) => client<IData>(merge(config, getExtraConfig())));

      return promise;
    }

    if (isRefreshingToken.current) return putInQueue();

    const result = await client<IData>(merge(config, getExtraConfig())).catch((error: IApiClientError) => error);

    if (result instanceof Error) {
      // check if token already updated by expiresAt field
      if (result.response.status === 403) {
        if (!isRefreshingToken.current) handleRefreshToken().then(() => releaseQueuedRequests());

        return putInQueue();
      }

      throw result;
    }

    return result;
  }

  return { request };
}
