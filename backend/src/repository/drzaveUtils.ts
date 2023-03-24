import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { drzava_lokalno } = query;

    if(drzava_lokalno){
        qb.where("e.drzava_lokalno like :name", { name:  `%${drzava_lokalno}%` });
    }
    let { oznaka_drzave } = query;

    if(oznaka_drzave){
        qb.where("e.oznaka_drzave like :name", { name:  `%${oznaka_drzave}%` });
    }
    let { drzava_iso } = query;

    if(drzava_iso){
        qb.where("e.drzava_iso like :name", { name:  `%${drzava_iso}%` });
    }
    let { opombe } = query;

    if(opombe){
        qb.where("e.opombe like :name", { name:  `%${opombe}%` });
    }
    return qb;
}
