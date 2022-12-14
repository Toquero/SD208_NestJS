import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotesStatusValidationPipe } from 'src/pipes/notes-status-validation-pipe';
import { CreateNotesInfo } from './infos/create.notes.info';
import { GetNotesFilterInfos } from './infos/get.notes-filter.infos';
import { Notes, NotesStatus } from './notes.model';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private noteService: NotesService){}

    @Get(':id')
    getNote(@Param('id') id:string) {
        return this.noteService.getNote(id);
    }

    @Get()
    getNotes(@Query(ValidationPipe) filterInfos: GetNotesFilterInfos) {
        return this.noteService.getNotes(filterInfos);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createNote(@Body() body: CreateNotesInfo): Notes {
        return this.noteService.createNote(body);
    }

    @Delete(':id')
    deleteNote(@Param('id') id:string): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id') id:string, @Body('title') title: string, @Body('status', NotesStatusValidationPipe) status: NotesStatus): Notes{
       return this.noteService.updateNote(id, title, status);
    }
}
