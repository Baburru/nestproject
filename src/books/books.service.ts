import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) { }
  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save(createBookDto)
  }

  findAll() {
    return `This action returns all books`;
  }

  async findOne(id: string) {
    const objID = new ObjectId(id)
    const userFind = await this.booksRepository.findOneBy({_id: objID});
  
    if (!userFind) {
      throw new Error(`Book with id ${id} not found`);
    }
  
    return userFind;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const objID =  new ObjectId(id)
    return this.booksRepository.findOneBy({_id: objID})
      .then(book => {
        if (!book) {
          throw new Error(`Book with id ${id} not found`);
        }

        // Mettez à jour les propriétés du livre avec celles du DTO
        Object.assign(book, updateBookDto);

        // Enregistrez les modifications dans la base de données
        return this.booksRepository.save(book);
      });
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
