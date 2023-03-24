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

import { Nullable } from '../utils';

/**
 * Schema for postne_stevilke entity
 */
export const postne_stevilkeSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        postna_stevilka: TypeBox.Type.String({ default: '' }),

        kraj_mesto: TypeBox.Type.String({ default: '' }),

        drzave_id: TypeBox.Type.Optional(Nullable(drzaveSchema)),

}, { additionalProperties: false });

/**
 * Input type for editing and creating postne_stevilke
 */
export const postne_stevilkeInputSchema = TypeBox.Type.Object({

        postna_stevilka: TypeBox.Type.String({ default: '' }),

        kraj_mesto: TypeBox.Type.String({ default: '' }),

        drzave_id: TypeBox.Type.Optional(TypeBox.Type.String()),

}, { additionalProperties: false });

export type Postne_stevilkeInput = TypeBox.Static<typeof postne_stevilkeInputSchema>;

@Entity()
export class Postne_stevilke implements Omit<TypeBox.Static<typeof postne_stevilkeSchema>, 'drzave_id'> {
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
        kraj_mesto!: string;

        @ManyToOne(() => Drzave, { cascade: true })
    @JoinColumn()
        drzave_id?: Drzave;

}
