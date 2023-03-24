import { EntityRepository, Repository } from 'typeorm';

import { Osebe } from '../entity/Osebe';
import { applyFilters, EntityQuery } from './osebeUtils';

@EntityRepository(Osebe)
export class OsebeRepository extends Repository<Osebe> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Osebe[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)

              .leftJoinAndSelect('e.poste_stevilke_id', 'poste_stevilke_id')
            ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

              .leftJoinAndSelect('e.poste_stevilke_id', 'poste_stevilke_id')

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
