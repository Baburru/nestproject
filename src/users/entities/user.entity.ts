import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
@Entity('users')
export class User {
  @ObjectIdColumn()
  @ApiProperty({ type: Number, description: 'ID', example: 2 })
  _id: ObjectId;
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'johndoe@email.com',
  })
  @Column({ type: String, unique: true, nullable: false })
  email: string;
  @ApiProperty({
    type: String,
    description: 'Mot de passe',
    example: 'azertyuiop',
  })
  @Column()
  password: string;
  @ApiProperty({ type: String, description: 'Nom', example: 'Doe' })
  @Column()
  lastName: string;
  @ApiProperty({ type: String, description: 'Prénom', example: 'John' })
  @Column()
  firstName: string;
}
