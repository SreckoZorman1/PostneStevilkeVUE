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

import { Postne_stevilke, postne_stevilkeSchema } from './Postne_stevilke';

import { Nullable } from '../utils';

/**
 * Schema for osebe entity
 */
export const osebeSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        ime: TypeBox.Type.String({ default: '' }),

        priimek: TypeBox.Type.String({ default: '' }),

        emso: TypeBox.Type.String({ default: '' }),

        spol: TypeBox.Type.String({ default: '' }),

        datum_rojstva: TypeBox.Type.Optional(TypeBox.Type.String({ format: 'date' })),

        naslov: TypeBox.Type.String({ default: '' }),

        enaslov: TypeBox.Type.String({ default: '' }),

        telefon: TypeBox.Type.String({ default: '' }),

        davcna_stevilka: TypeBox.Type.String({ default: '' }),

        poste_stevilke_id: TypeBox.Type.Optional(Nullable(postne_stevilkeSchema)),

}, { additionalProperties: false });

/**
 * Input type for editing and creating osebe
 */
export const osebeInputSchema = TypeBox.Type.Object({

        ime: TypeBox.Type.String({ default: '' }),

        priimek: TypeBox.Type.String({ default: '' }),

        emso: TypeBox.Type.String({ default: '' }),

        spol: TypeBox.Type.String({ default: '' }),

        datum_rojstva: TypeBox.Type.Optional(TypeBox.Type.String({ format: 'date' })),

        naslov: TypeBox.Type.String({ default: '' }),

        enaslov: TypeBox.Type.String({ default: '' }),

        telefon: TypeBox.Type.String({ default: '' }),

        davcna_stevilka: TypeBox.Type.String({ default: '' }),

        poste_stevilke_id: TypeBox.Type.Optional(TypeBox.Type.String()),

}, { additionalProperties: false });

export type OsebeInput = TypeBox.Static<typeof osebeInputSchema>;

@Entity()
export class Osebe implements Omit<TypeBox.Static<typeof osebeSchema>, 'poste_stevilke_id'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        ime!: string;

        @Column({ default: '' })
        priimek!: string;

        @Column({ default: '' })
        emso!: string;

        @Column({ default: '' })
        spol!: string;

        @Column({ type: 'date', nullable: true })
        datum_rojstva?: string;

        @Column({ default: '' })
        naslov!: string;

        @Column({ default: '' })
        enaslov!: string;

        @Column({ default: '' })
        telefon!: string;

        @Column({ default: '' })
        davcna_stevilka!: string;

        @ManyToOne(() => Postne_stevilke, { cascade: true })
    @JoinColumn()
        poste_stevilke_id?: Postne_stevilke;

}
