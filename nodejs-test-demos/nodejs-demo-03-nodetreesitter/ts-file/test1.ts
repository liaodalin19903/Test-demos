class AnimalBase {
  readonly skeleton: number
  readonly blood: 'red' | 'blue' | 'transparent'
}

abstract class Animal extends AnimalBase {

  readonly age: number = 0
  abstract shout (): void  

}

class Cat extends Animal {
  shout() {
      console.log('mew mew')
  }
}

class Dog extends Animal {
  shout() {
      console.log('bark bark')
  }
}