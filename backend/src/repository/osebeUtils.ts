import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { ime } = query;

    if(ime){
        qb.where("e.ime like :name", { name:  `%${ime}%` });
    }
    let { priimek } = query;

    if(priimek){
        qb.where("e.priimek like :name", { name:  `%${priimek}%` });
    }
    let { emso } = query;

    if(emso){
        qb.where("e.emso like :name", { name:  `%${emso}%` });
    }
    let { spol } = query;

    if(spol){
        qb.where("e.spol like :name", { name:  `%${spol}%` });
    }
    let { naslov } = query;

    if(naslov){
        qb.where("e.naslov like :name", { name:  `%${naslov}%` });
    }
    let { enaslov } = query;

    if(enaslov){
        qb.where("e.enaslov like :name", { name:  `%${enaslov}%` });
    }
    let { telefon } = query;

    if(telefon){
        qb.where("e.telefon like :name", { name:  `%${telefon}%` });
    }
    let { davcna_stevilka } = query;

    if(davcna_stevilka){
        qb.where("e.davcna_stevilka like :name", { name:  `%${davcna_stevilka}%` });
    }
    return qb;
}
