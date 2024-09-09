
abstract class Animal {

  readonly age: number = 0
  abstract shout (): void  

}

class Cat extends Animal {
  shout() {
      console.log('喵喵')
  }
}

class Dog extends Animal {
  name: string
  shout() {
      console.log('汪汪')
  }
}

class Game {
  animalShout(ani: Animal){  // 问题1：多态，在传输对象的时候，我们不知道传入什么类的对象；问题2（如何方便我检索）：这个基类Animal，我不知道下面有哪些继承了它。
    ani.shout()
  }
}

const cat: Cat = new Cat()

const game: Game = new Game()
game.animalShout(cat)

