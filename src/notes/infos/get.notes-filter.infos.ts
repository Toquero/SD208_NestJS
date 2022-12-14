import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { NotesStatus } from "../notes.model";

export class GetNotesFilterInfos{

    @IsOptional()
    @IsIn(Object.values(NotesStatus))
    status: NotesStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}