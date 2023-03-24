import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { postna_stevilka } = query;

    if(postna_stevilka){
        qb.where("e.postna_stevilka like :name", { name:  `%${postna_stevilka}%` });
    }
    let { kraj_mesto } = query;

    if(kraj_mesto){
        qb.where("e.kraj_mesto like :name", { name:  `%${kraj_mesto}%` });
    }
    return qb;
}
