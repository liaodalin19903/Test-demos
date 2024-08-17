function Person(name, age) {
    this.name = name;
    this.age = age;
}


Person.prototype.height = 175

let person1 = new Person('John', 30);
let person2 = new Person('John2', 33);
person2.height = 176

console.log(Object.getPrototypeOf(person2))

console.log(person2.height)


