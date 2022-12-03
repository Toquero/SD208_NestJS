import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotesInfo } from './infos/create.notes.info';
import { Notes } from './notes.model';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private noteService: NotesService){}

    @Get(':id')
    getNote(@Param('id') id:string) {
        return this.noteService.getNote(id);
    }

    @Get()
    getNotes() {
        return this.noteService.getNotes();
    }

    @Post('create')
    createNote(@Body() body: CreateNotesInfo): Notes {
        return this.noteService.createNote(body);
    }

    @Delete(':id')
    deleteNote(@Param('id') id:string): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id') id:string, @Body('description') description: string): Notes{
       return this.noteService.updateNote(id, description);
    }
}
