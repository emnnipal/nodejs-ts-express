export interface IHttpResponse<Records = unknown, Results = unknown> {
  message: string;
  statusCode: number;
  code: number;
  records?: Records;
  results?: Results;
}
