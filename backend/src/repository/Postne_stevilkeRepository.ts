import { EntityRepository, Repository } from 'typeorm';

import { Postne_stevilke } from '../entity/Postne_stevilke';
import { applyFilters, EntityQuery } from './postne_stevilkeUtils';

@EntityRepository(Postne_stevilke)
export class Postne_stevilkeRepository extends Repository<Postne_stevilke> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Postne_stevilke[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)

              .leftJoinAndSelect('e.drzave_id', 'drzave_id')
            ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

              .leftJoinAndSelect('e.drzave_id', 'drzave_id')

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
