import axios from 'axios';
import { NODE_ENV, API_URL, INodeEnv } from 'src/env';

export interface IApiClientResponse<IData = any>  {
  data: IData;
  status: number;
  headers: Record<string, string>;
  config: IApiClientConfig;
}

export interface IApiClientError extends Error {
  response: IApiClientResponse;
}

export interface IApiClientConfig {
  url?: string;
  method?: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";
  headers?: Record<string, string>;
  params?: any;
  data?: any;
  signal?: AbortSignal;
  baseURL?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
}

export type IApiClient = <IData = any>(config: IApiClientConfig) => Promise<IApiClientResponse<IData>>;

const createLocalApiClient = (): IApiClient => axios.create({ baseURL: API_URL });

const createTestApiClient = (): IApiClient => axios.create({ baseURL: API_URL });

const createDevelopmentApiClient = (): IApiClient => axios.create({ baseURL: API_URL })

const envInitializerMap: Record<INodeEnv, () => IApiClient> = {
  local: createLocalApiClient,
  test: createTestApiClient,
  development: createDevelopmentApiClient,
}

export const ApiClient = (env = NODE_ENV): IApiClient => envInitializerMap[env]();
