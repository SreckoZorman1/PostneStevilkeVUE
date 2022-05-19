import { EntityRepository, Repository } from 'typeorm';

import { Postne_stevilke } from '../entity/Postne_stevilke';
import { applyFilters, EntityQuery } from './postne_stevilkeUtils';

@EntityRepository(Postne_stevilke)
export class Postne_stevilkeRepository extends Repository<Postne_stevilke> {

    filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC" ): Promise<[Postne_stevilke[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            return qb
                .skip(page * size)
                .take(size)
                .orderBy(`e.${field}`, sort)

                .leftJoinAndSelect('e.id_drzave', 'id_drzave')

                .getManyAndCount();
        } else {
            return qb
                .skip(page * size)
                .take(size)

                .leftJoinAndSelect('e.id_drzave', 'id_drzave')

                .getManyAndCount();
        }
    }
}
