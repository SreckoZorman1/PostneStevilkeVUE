import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    ManyToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Drzave, drzaveSchema } from './Drzave';

/**
 * Schema for postne_stevilke entity
 */
export const postne_stevilkeSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        postna_stevilka: TypeBox.Type.String({ default: '' }),

        kraj: TypeBox.Type.String({ default: '' }),

        id_drzave: TypeBox.Type.Optional(drzaveSchema),

}, { additionalProperties: false });

/**
 * Input type for editing and creating postne_stevilke
 */
export const postne_stevilkeInputSchema = TypeBox.Type.Object({

        postna_stevilka: TypeBox.Type.String({ default: '' }),

        kraj: TypeBox.Type.String({ default: '' }),

        id_drzave: TypeBox.Type.Optional(TypeBox.Type.String()),

}, { additionalProperties: false });

export type Postne_stevilkeInput = TypeBox.Static<typeof postne_stevilkeInputSchema>;

@Entity()
export class Postne_stevilke implements Omit<TypeBox.Static<typeof postne_stevilkeSchema>, 'id_drzave'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        postna_stevilka!: string;

        @Column({ default: '' })
        kraj!: string;

        @ManyToOne(() => Drzave, { cascade: true })
    @JoinColumn()
        id_drzave?: Drzave;

}
