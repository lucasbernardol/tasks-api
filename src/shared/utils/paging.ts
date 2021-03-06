import { OutPut, Constants } from 'paging-util';

/**
 * @interface Normalized
 */
export interface Normalized {
  records: number;
  pages: number;
  current: number;
  first: number;
  limit: number;

  next: number;
  previous: number;
  has_next: boolean;
  has_previous: boolean;

  range?: number[] | null;
  length: number;
}

/**
 * @interface NormalizedFixed
 */
export interface NormalizedFixed {
  min_limit: number;
  max_limit: number;
}

/**
 * @function pagingUtilNormalize
 */
export function pagingUtilNormalize(paging: Partial<OutPut>): Normalized {
  return {
    records: paging.records,
    pages: paging.totalPages,
    current: paging.currentPage,
    first: paging.firstPage,
    limit: paging.limit,

    next: paging.next,
    previous: paging.previous,
    has_next: paging.hasNext,
    has_previous: paging.hasPrevious,

    range: paging.range,
    length: paging.length,
  };
}

/**
 * @function pagingUtilFixed
 */
export function pagingUtilFixed(
  constants: Partial<Constants>
): NormalizedFixed {
  return {
    min_limit: constants.MIN_LIMIT,
    max_limit: constants.MAX_LIMIT,
  };
}
