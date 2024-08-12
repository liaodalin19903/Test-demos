const fs = require("fs")
const Parser = require("tree-sitter")

const C = require("tree-sitter-c")
const Java = require("tree-sitter-java");
const JavaScript = require("tree-sitter-javascript");
const JSON = require("tree-sitter-json");
const Python = require("tree-sitter-python");
const Ruby = require("tree-sitter-ruby");
const Rust = require("tree-sitter-rust");

const { Query, QueryCursor } = Parser 

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
  shout() {
      console.log('汪汪')
  }
}

class Person {}
 
const TestPerson = class {}

class Person2 {}
 
const TestPerson2 = class {}
  `);
const matches = query.matches(tree.rootNode);

//console.log(matches.toString())

matches.forEach(item => {
  console.log(item.captures[0].node.text)
})


//#endregion