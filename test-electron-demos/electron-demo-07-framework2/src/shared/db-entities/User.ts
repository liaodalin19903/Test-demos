import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number

  constructor(firstName: string = '', lastName: string = '', age: number = 0) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }
}
