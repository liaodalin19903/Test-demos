class Animal {
  readonly age: number = 0
  readonly name: string | undefined = undefined

  constructor(age: number, name: string) {
    this.age = age 
    this.name = name
  }
}

export class Person extends Animal {

  readonly height: number 
  constructor(age: number, name: string, height: number) {
    super(age, name)
    this.height = height
  }
}

