import { IRequest } from 'src/context/ApiContext';

interface ISignInParams {
  email: string;
  password: string;
}

interface ISignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IAuthResponse {
  accessToken: string;
}

export class AuthApi {
  prefix = '/auth';
  request: IRequest;

  constructor(request: IRequest) {
    this.request = request;
  }

  async signIn(data: ISignInParams) {
    return this.request<IAuthResponse>({ method: 'POST', url: `${this.prefix}/sign-in`, data });
  }

  async signUp(data: ISignUpParams) {
    return this.request<IAuthResponse>({ method: 'POST', url: `${this.prefix}/sign-up`, data });
  }
}
