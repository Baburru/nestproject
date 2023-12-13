import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const objID = new ObjectId(id)
    const userFind = await this.usersRepository.findOneBy({_id: objID});
  
    if (!userFind) {
      throw new Error(`Book with id ${id} not found`);
    }
  
    return userFind;  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const objID =  new ObjectId(id)
    return this.usersRepository.findOneBy({_id: objID})
      .then(user => {
        if (!user) {
          throw new Error(`User with id ${id} not found`);
        }

        // Mettez à jour les propriétés du livre avec celles du DTO
        Object.assign(user, updateUserDto);

        // Enregistrez les modifications dans la base de données
        return this.usersRepository.save(user);
      });  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
