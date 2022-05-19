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
    let { kraj } = query;

    if(kraj){
        qb.where("e.kraj like :name", { name:  `%${kraj}%` });
    }
    return qb;
}
