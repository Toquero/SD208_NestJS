import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { NotesStatus } from "src/notes/notes.model";
import { PipelineTransform } from "stream";

export class NotesStatusValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata){
        if(!this.isStatusvalid(value)){
            throw new BadRequestException('${value} is not a valid status');
        }
        return value;
    }

    private isStatusvalid(status: any){
        return Object.values(NotesStatus).includes(status.toUpperCase() as NotesStatus);
    }
}