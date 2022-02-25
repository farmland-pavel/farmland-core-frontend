import { createContext, useContext } from 'react';
import { AuthApi, CourseApi, QuizApi } from './services';
import { ApiClient, IApiClientConfig, IApiClientError, IApiClientResponse } from 'src/services/ApiClient';

export interface IRequestConfig extends IApiClientConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export type IRequestResponse<IData = any> = IApiClientResponse<IData>;

export type IRequestError = IApiClientError;

export type IRequest = <IData = any>(config: IRequestConfig) => Promise<IRequestResponse<IData>>;

export interface IApiContextValue {
  authApi: AuthApi;
  courseApi: CourseApi;
  quizApi: QuizApi;
}

interface ICreateContextValueProps {
  request: IRequest;
}

export const createContextValue = (props: ICreateContextValueProps) => {
  const { request } = props;

  return {
    authApi: new AuthApi(request),
    courseApi: new CourseApi(request),
    quizApi: new QuizApi(request),
  }
}

export const initialValue: IApiContextValue = createContextValue({ request: ApiClient() });

export const ApiContext = createContext<IApiContextValue>(initialValue);

export const useApi = () => useContext(ApiContext);
