import { IPaginatorData } from '../../shared/interfaces/paginator-data.interface';

export const DEFAULT_PAGINATION_CONFIG: IPaginatorData = {
  pageIndex: 0,
  pageSize: 5,
  totalElements: 0,
};

export const DEFAULT_CARD_PAGINATION_CONFIG: IPaginatorData = {
  pageIndex: 0,
  pageSize: 4,
  totalElements: 0,
};
