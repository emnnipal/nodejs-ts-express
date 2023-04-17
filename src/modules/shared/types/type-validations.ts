import { DeepPartial } from './type-utils';

export interface FindManyRecords<T> {
  search?: string;
  page?: number;
  pageSize?: number;
  filters?: DeepPartial<T> & { clientId?: string };
}

export type CountRecords<T> = Pick<FindManyRecords<T>, 'filters' | 'search'>;
