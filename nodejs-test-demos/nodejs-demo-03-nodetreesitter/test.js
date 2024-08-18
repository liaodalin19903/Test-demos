const Parser = require("tree-sitter")
const TypeScript = require("tree-sitter-typescript").typescript

const { Query } = Parser 

const parser = new Parser()
parser.setLanguage(TypeScript)

/*
const query = new Query(
  TypeScript,
  `
    (class_declaration 
      name: (identifier) @class-name
      (class_heritage (extends_clause value: (identifier)))
      )
  `
);
*/

//(class_declaration name: (identifier) @class-name)
const query = new Query(
  TypeScript,
  `
    (class_declaration name: (identifier) @class-name)
  `
);


const tree = parser.parse(`
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
    `);

const matches = query.matches(tree.rootNode);
console.log(matches[3].captures[0].node.text)  // Dog 

