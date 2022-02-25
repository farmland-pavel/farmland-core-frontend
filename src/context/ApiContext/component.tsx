import { FC, useMemo } from 'react';
import { useRootStore } from 'src/store';
import { ApiContext, IApiContextValue, createContextValue } from './context';
import { useRequest, useRequestHeadersInterceptor, useRefreshTokenInterceptor } from './hooks';
import { ApiClient } from 'src/services/ApiClient';

interface IApiContextProviderProps {
  isRequestHeadersInterceptorEnabled?: boolean;
  isRefreshTokenInterceptorEnabled?: boolean;
}

export const ApiContextProvider: FC<IApiContextProviderProps> = (props: IApiContextProviderProps) => {
  const { children, isRequestHeadersInterceptorEnabled = true, isRefreshTokenInterceptorEnabled = true } = props;

  const client = useMemo(() => ApiClient(), []);

  const store = useRootStore();

  const { request } = useRequest({ client });

  // interceptors order matter, from last(closest to http request) to first(executed before all other interceptors)

  const requestWithRequestHeaders = useRequestHeadersInterceptor({ request, store, isEnabled: isRequestHeadersInterceptorEnabled });

  const requestWithRefreshToken = useRefreshTokenInterceptor({ request: requestWithRequestHeaders, store, isEnabled: isRefreshTokenInterceptorEnabled });

  const value: IApiContextValue = useMemo(() => createContextValue({ request: requestWithRefreshToken }), [requestWithRefreshToken]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}

// import { FC, useMemo } from 'react';
// import { useRootStore } from 'src/store';
// import { ApiContext, IApiContextValue, createContextValue } from './context';
// import { useRequest } from './oldHooks';
// import { ApiClient } from 'src/services/ApiClient';

// export const ApiContextProvider: FC = (props) => {
//   const { children } = props;

//   const client = useMemo(() => ApiClient(), []);

//   const store = useRootStore();

//   const { request } = useRequest({ client, store });

//   const value: IApiContextValue = useMemo(() => createContextValue({ request }), [request]);

//   return (
//     <ApiContext.Provider value={value}>
//       {children}
//     </ApiContext.Provider>
//   )
// }
