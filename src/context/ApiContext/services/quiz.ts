import { IRequest } from 'src/context/ApiContext';
import { COURSE_LEVEL, COURSE_GOAL, CONSUMPTION } from 'src/constants';

interface ICreateQuizParams {
  level: COURSE_LEVEL;
  goal: COURSE_GOAL;
  consumption: CONSUMPTION;
}

export class QuizApi {
  prefix = '/quizzes';
  request: IRequest;

  constructor(request: IRequest) {
    this.request = request;
  }

  async get() {
    return this.request({ method: 'GET', url: `${this.prefix}` });
  }

  async create(data: ICreateQuizParams) {
    return this.request({ method: 'POST', url: `${this.prefix}`, data });
  }
}
