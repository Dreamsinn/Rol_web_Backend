import { query } from 'express-validator';
import { DEFAUL_PAGINATION_QUERY_VALUES } from '../../use-cases/utility/pagination';
import { PagginationSort } from '../enums/PaginationSort';

const { limit, offset, sort } = DEFAUL_PAGINATION_QUERY_VALUES;

export const paginationMiddleware = [
    query('offset', `Optional, must be an Integer. By default: ${offset}`)
        .isInt({ min: 0 })
        .optional(),

    query('limit', `Optional, must be an Integer. By default: ${limit}`)
        .isInt({ min: 1 })
        .optional(),

    query(
        'sort',
        `Optional, must be ${PagginationSort.ASC} or ${PagginationSort.DESC}. By default: ${sort}`,
    )
        .custom((value) => {
            if (value.toUpperCase() in PagginationSort) {
                return true;
            }
            return false;
        })
        .optional(),
];
