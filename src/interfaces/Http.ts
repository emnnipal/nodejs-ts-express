export interface IHttpResponse<Results = unknown> {
  message: string;
  statusCode: number;
  code: number;
  result?: Results;
}

export enum Methods {
  UserGet = `users.get`,
  UserCreate = 'users.create',
}
