class AnimalBase {
  readonly skeleton: number
  readonly blood: 'red' | 'blue' | 'transparent'
}

abstract class Animal extends AnimalBase {

  readonly age: number = 0
  abstract shout (): void  

}

interface Bitable {
  bite()
}

class Cat extends Animal {
  shout() {
      console.log('mew mew')
  }
}

class Dog extends Animal implements Bitable {
  shout() {
      console.log('bark bark')
  }

  bite() {
    console.log('wangwang')
  }
}