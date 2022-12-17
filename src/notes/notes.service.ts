import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { CreateNotesInfo } from './infos/create.notes.info';
import {v4 as uuidv4} from 'uuid';
import { GetNotesFilterInfos } from './infos/get.notes-filter.infos';
import { NotesStatus } from './notes.model';
import { Notes } from './notes.entity';
import { InjectRepository } from '@nestjs/typeorm';import { Repository } from 'typeorm';
;

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Notes) private noteRepository: Repository<Notes>
    ){}
    
    async getAllNotes(): Promise<Notes[]>{
        try {
            const result = await this.noteRepository.find()
            return result;
        } catch (error) {
            //throw error
        }

    }

    // getNotes(filterInfos: GetNotesFilterInfos): Notes[] {
    //     const {status, search} = filterInfos;
    //     let notes = this.notes;

    //     if(status){
    //         notes = notes.filter(x => x.status === status);
    //     }

    //     if(search){
    //         notes = notes.filter(x => x.title.includes(search) || x.description.includes(search));
    //     }
    //     return notes;
    // }

    async getNote(id: number):Promise<Notes>{
        try {
            const note = await this.noteRepository.findOneBy({id});
            if(!note){
                throw new NotFoundException("Note not file");
            }
            return note;

        } catch (error) {
             //throw error
        }
    }   

    async createNote(note: CreateNotesInfo): Promise<Notes>{
        try {
            const newNotes = this.noteRepository.create({
                ...note,
                status:NotesStatus.OPEN,
                createDate:new Date()
            });
            const result = await this.noteRepository.save(newNotes);
            return result;
        } catch (error) {
            //throw error
        }
     
    }

    async deleteNote(id: number): Promise<void>{
        try {
            const result = this.getNote(id);
            await this.noteRepository.delete({id})
        } catch (error) {
            //throw error
        }
    }

    async updateNote(id: number, status: NotesStatus): Promise<{}>{
        try {
            const note = this.getNote(id);
            const result = await this.noteRepository.update({id},{status});
            return{
                message:"Successfully Updated."
            }
        } catch (error) {
            //throw error
        }
    }
}
