import { EntityRepository, Repository } from 'typeorm';

import { Drzave } from '../entity/Drzave';
import { applyFilters, EntityQuery } from './drzaveUtils';

@EntityRepository(Drzave)
export class DrzaveRepository extends Repository<Drzave> {

    filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC" ): Promise<[Drzave[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            return qb
                .skip(page * size)
                .take(size)
                .orderBy(`e.${field}`, sort)

                .getManyAndCount();
        } else {
            return qb
                .skip(page * size)
                .take(size)

                .getManyAndCount();
        }
    }
}
