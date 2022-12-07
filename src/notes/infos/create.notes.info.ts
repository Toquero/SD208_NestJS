import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNotesInfo {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    description: string;
}