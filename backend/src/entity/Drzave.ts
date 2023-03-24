import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Nullable } from '../utils';

/**
 * Schema for drzave entity
 */
export const drzaveSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        drzava_lokalno: TypeBox.Type.String({ default: '' }),

        oznaka_drzave: TypeBox.Type.String({ default: '' }),

        drzava_iso: TypeBox.Type.String({ default: '' }),

        opombe: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating drzave
 */
export const drzaveInputSchema = TypeBox.Type.Object({

        drzava_lokalno: TypeBox.Type.String({ default: '' }),

        oznaka_drzave: TypeBox.Type.String({ default: '' }),

        drzava_iso: TypeBox.Type.String({ default: '' }),

        opombe: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

export type DrzaveInput = TypeBox.Static<typeof drzaveInputSchema>;

@Entity()
export class Drzave implements TypeBox.Static<typeof drzaveSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        drzava_lokalno!: string;

        @Column({ default: '' })
        oznaka_drzave!: string;

        @Column({ default: '' })
        drzava_iso!: string;

        @Column({ default: '' })
        opombe!: string;

}
