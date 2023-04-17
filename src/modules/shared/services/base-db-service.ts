export interface BaseServiceParams<T> {
  schema?: T;
}

class BaseDbService<T> implements BaseServiceParams<T> {
  schema: BaseServiceParams<T>['schema'];

  constructor({ schema }: BaseServiceParams<T>) {
    this.schema = schema;
  }

  find = () => [];

  create = () => null;

  update = () => null;

  delete = () => null;
}

export default BaseDbService;
