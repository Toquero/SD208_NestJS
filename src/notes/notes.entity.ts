import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NotesStatus } from "./notes.model";

@Entity()
export class Notes extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: NotesStatus;

    @Column()
    createDate: Date;
}