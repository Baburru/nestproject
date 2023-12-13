import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
@Entity('books')
export class Book {
  @ObjectIdColumn()
  @ApiProperty({ type: Number, description: 'ID', example: 2 })
  _id: ObjectId;
  @ApiProperty({
    type: String,
    description: 'Nom',
    example: 'Misérables',
  })
  @Column({ type: String, unique: true, nullable: false })
  name: string;
  @ApiProperty({
    type: String,
    description: 'Date',
    example: '06/04/2002',
  })
  @Column()
  date: string;
}
