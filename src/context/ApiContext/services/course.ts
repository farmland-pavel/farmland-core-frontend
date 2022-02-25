import { IRequest } from 'src/context/ApiContext';

export class CourseApi {
  prefix = '/courses';
  request: IRequest;

  constructor(request: IRequest) {
    this.request = request;
  }

  async get() {
    return this.request({ method: 'GET', url: `${this.prefix}` });
  }
}
