import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotesStatusValidationPipe } from 'src/pipes/notes-status-validation-pipe';
import { CreateNotesInfo } from './infos/create.notes.info';
import { GetNotesFilterInfos } from './infos/get.notes-filter.infos';
import { Notes, NotesStatus } from './notes.model';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private noteService: NotesService){}


    @Get()
    getNotes(){
        return this.noteService.getAllNotes();
    }


    @Get(':id')
    getNote(@Param('id',ParseIntPipe) id:number) {
        return this.noteService.getNote(id);
    }

    // @Get()
    // getNotes(@Query(ValidationPipe) filterInfos: GetNotesFilterInfos) {
    //     return this.noteService.getNotes(filterInfos);
    // }

    @Post('create')
    @UsePipes(ValidationPipe)
    createNote(@Body() body: CreateNotesInfo){
        return this.noteService.createNote(body);
    }

    @Delete(':id')
    deleteNote(@Param('id',ParseIntPipe) id:number): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id', ParseIntPipe) id:number,@Body('status', NotesStatusValidationPipe) status: NotesStatus){
       return this.noteService.updateNote(id, status);
    }
}
