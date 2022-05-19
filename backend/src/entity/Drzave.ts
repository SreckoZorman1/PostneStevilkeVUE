import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

/**
 * Schema for drzave entity
 */
export const drzaveSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        drzava_slo: TypeBox.Type.String({ default: '' }),

        drzava_iso: TypeBox.Type.String({ default: '' }),

        oznaka_dvomestna: TypeBox.Type.String({ default: '' }),

        oznaka_tromestna: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating drzave
 */
export const drzaveInputSchema = TypeBox.Type.Object({

        drzava_slo: TypeBox.Type.String({ default: '' }),

        drzava_iso: TypeBox.Type.String({ default: '' }),

        oznaka_dvomestna: TypeBox.Type.String({ default: '' }),

        oznaka_tromestna: TypeBox.Type.String({ default: '' }),

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
        drzava_slo!: string;

        @Column({ default: '' })
        drzava_iso!: string;

        @Column({ default: '' })
        oznaka_dvomestna!: string;

        @Column({ default: '' })
        oznaka_tromestna!: string;

}
