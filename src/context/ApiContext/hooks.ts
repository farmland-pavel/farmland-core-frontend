import { useRef, useMemo, useCallback } from 'react';
import merge from 'lodash/merge';
import type { IApiClient } from 'src/services/ApiClient';
import type { RootStore } from 'src/store/rootStore';
import type { IRequest, IRequestConfig, IRequestError } from 'src/context/ApiContext';

interface IUseRequestProps {
  client: IApiClient;
}

interface IRequestOptions {
  isAccessTokenDisabled?: boolean;
}

export const useRequest = (props: IUseRequestProps) => {
  const { client } = props;

  const request = useMemo(() => async <IData>(config: IRequestConfig, options: IRequestOptions = {}) => client<IData>(config), [client]);

  return { request };
}

interface IQueuedRequest {
  promise: Promise<any>,
  resolve: (config: IRequestConfig) => void;
  config: IRequestConfig;
}

interface IUseRequestHeadersInterceptorProps {
  request: IRequest;
  store: RootStore;
  isEnabled: boolean;
}

export const useRequestHeadersInterceptor = (props: IUseRequestHeadersInterceptorProps) => {
  const { request, store, isEnabled } = props;

  const getExtraConfig = useCallback((isAccessTokenDisabled = false) => {
    let extraConfig = {};
  
    const { accessToken } = store.authStore;
  
    if (!isAccessTokenDisabled && !!accessToken) extraConfig = merge(extraConfig, { headers: { Authorization: `Bearer ${accessToken}`} });
  
    return extraConfig;
  }, [store])

  const requestWithHeadersInterceptor = useMemo(() => new Proxy(request, {
    async apply<IData>(target: IRequest, _thisArg: any, argumentsList: [IRequestConfig, IRequestOptions | undefined]) {
      const [config, options] = argumentsList;
      return target<IData>(merge(config, getExtraConfig(options?.isAccessTokenDisabled)));
    }
  }), [request, getExtraConfig]);

  return isEnabled ? requestWithHeadersInterceptor : request;
}

interface IUseRefreshTokenInterceptorProps {
  request: IRequest;
  store: RootStore;
  isEnabled: boolean;
}

export const useRefreshTokenInterceptor = (props: IUseRefreshTokenInterceptorProps) => {
  const { request, store, isEnabled } = props;

  const isRefreshingToken = useRef<boolean>(false);
  const queuedRequests = useRef<IQueuedRequest[]>([]);

  const queueRequest = useCallback(<IData>(client: IRequest, config: IRequestConfig) => {
    const promise = new Promise((resolve) => {
      queuedRequests.current = [...queuedRequests.current, { promise, resolve, config }];
    }).then((config) => client<IData>(config as IRequestConfig));

    return promise;
  }, [])

  const releaseQueuedRequests = useCallback(() => {
    queuedRequests.current.forEach(queuedRequest => queuedRequest.resolve(queuedRequest.config));
    queuedRequests.current = [];
  }, []);

  const handleRefreshToken = useCallback(async (client: IRequest) => {
    isRefreshingToken.current = true;
  
    const result = await client<{accessToken: string}>({ method: 'POST', url: '/auth/refresh' }).catch((error: IRequestError) => error);

    if (result instanceof Error) console.log('log error of refreshing token');

    if (!(result instanceof Error)) store.authStore.login(result.data.accessToken);

    isRefreshingToken.current = false;
  }, [store])

  const requestWithRefreshTokenInterceptor = useMemo(() => new Proxy(request, {
    async apply<IData>(target: IRequest, _thisArg: any, argumentsList: [IRequestConfig]) {
      const [config] = argumentsList;

      if (isRefreshingToken.current) return queueRequest<IData>(target, config);
  
      const result = await target<IData>(config).catch((error: IRequestError) => error);
  
      if (result instanceof Error) {
        // check if token already updated by expiresAt field
        if (result.response.status === 403) {
          if (!isRefreshingToken.current) handleRefreshToken(target).finally(releaseQueuedRequests);
  
          return queueRequest<IData>(target, config);
        }
  
        throw result;
      }
  
      return result;
    }
  }), [request, handleRefreshToken, releaseQueuedRequests, queueRequest]);

  return isEnabled ? requestWithRefreshTokenInterceptor : request;
}
