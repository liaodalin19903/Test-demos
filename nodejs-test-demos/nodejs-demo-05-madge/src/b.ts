import { Base } from './a'

export class Person implements Base {
  age: number;
  name: string;
  
  constructor(age: number, name: string) {
    this.age = age
    this.name = name 
  }
}

