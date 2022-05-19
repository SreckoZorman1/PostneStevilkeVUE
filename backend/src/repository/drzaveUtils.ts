import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { drzava_slo } = query;

    if(drzava_slo){
        qb.where("e.drzava_slo like :name", { name:  `%${drzava_slo}%` });
    }
    let { drzava_iso } = query;

    if(drzava_iso){
        qb.where("e.drzava_iso like :name", { name:  `%${drzava_iso}%` });
    }
    let { oznaka_dvomestna } = query;

    if(oznaka_dvomestna){
        qb.where("e.oznaka_dvomestna like :name", { name:  `%${oznaka_dvomestna}%` });
    }
    let { oznaka_tromestna } = query;

    if(oznaka_tromestna){
        qb.where("e.oznaka_tromestna like :name", { name:  `%${oznaka_tromestna}%` });
    }
    return qb;
}
