import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { CreateNotesInfo } from './infos/create.notes.info';
import { Notes } from './notes.model';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class NotesService {
    private notes: Notes[] = [
    //   {
    //     id: '1',
    //     title: 'Monday Diary',
    //     description: 'I was very happy today because it is another day to celebrate.'
    //   },
    //   {
    //     id: '2',
    //     title: 'Tuesday Diary',
    //     description: 'I was very happy today because it is another day to celebrate.'
    //   },
    //   {
    //     id: '3',
    //     title: 'Wednesday Diary',
    //     description: 'I was very happy today because it is another day to celebrate.'
    //   },
    //   {
    //     id: '4',
    //     title: 'Friday Diary',
    //     description: 'I was very happy today because it is another day to celebrate.'
    //   }

    ];
    
    getNotes(): Notes[] {
        return this.notes;
    }

    getNote(id: string): Notes{
        const note = this.notes.find(note => note.id === id);

        if(!this.notes){
            throw new NotFoundException();
        }
        return note;
    }   

    createNote(note: CreateNotesInfo): Notes{
        const {title, description} = note;

        const newNote:Notes ={
            id: uuidv4(),
            title,
            description
        }

        this.notes.push(newNote);
        return newNote;
    }

    deleteNote(id: string): void{
        const result = this.getNote(id);
        this.notes = this.notes.filter(notes => notes.id !== result.id);
    }

    updateNote(id: string, description: string): Notes{
        const note = this.getNote(id);
        note.description = description;
        return note;
    }
}
