import { Person } from './b'

class YelloRacePerson extends Person {
  race: string = 'yellow'
  constructor(age: number, name: string) {
    super(age, name)
  }
}

