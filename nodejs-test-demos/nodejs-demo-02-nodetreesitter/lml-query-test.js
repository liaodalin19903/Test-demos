const Parser = require("tree-sitter")
const JavaScript = require("tree-sitter-javascript");


const { Query } = Parser 

//#region 【JavaScript】

const parser = new Parser()
parser.setLanguage(JavaScript)

/*
// 基于string创建一个Query实例
const q_str = new Query(JavaScript, `
    (function_declaration name: (identifier) @fn-def)
    (call_expression function: (identifier) @fn-ref)
  `)

// 基于Buffer创建一个Query实例
const q_buffer = new Query(JavaScript, Buffer.from(`
  (function_declaration name: (identifier) @fn-def)
  (call_expression function: (identifier) @fn-ref)
`))

*/ 

// 1.  .matches 

const query = new Query(
  JavaScript,
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

//console.log(matches.toString())

// matches.forEach(item => {
//   console.log(item.captures[0].node.text)
// })

console.log(matches[3].captures[0].node.text)  // Dog 


//#endregion