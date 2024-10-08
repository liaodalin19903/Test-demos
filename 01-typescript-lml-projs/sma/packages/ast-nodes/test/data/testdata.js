// 类外函数
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

class Animal {
  type = 'animal'
  name = 'animal2'
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}

// class Person extends Animal {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   greet() {
//     console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//   }
// }

const person1 = new Person('Alice', 30);
person1.greet();

console.log(add(5, 3));
console.log(subtract(10, 4));