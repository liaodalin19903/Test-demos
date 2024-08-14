function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  
Person.prototype.sayHello = function() {
console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
}

let person1 = new Person('John', 30);
//person1.sayHello(); 

console.log(person1.prototype)
  