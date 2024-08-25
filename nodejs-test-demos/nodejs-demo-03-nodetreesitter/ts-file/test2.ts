const Parser = require("tree-sitter");
const TypeScript = require("tree-sitter-typescript").typescript;
const { Query } = Parser;

const parser = new Parser();
parser.setLanguage(TypeScript);

const query = new Query(
  TypeScript,
  `
    (class_declaration 
      name: (type_identifier) @class-name
      body: (class_body
        ((public_field_definition 
            name: (property_identifier) @property-name)
        | (method_definition 
            name: (property_identifier) @method-name))))
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
  shout2() {
      console.log('bark bark')
  }
}
    `);

const matches = query.matches(tree.rootNode);

const classPropertiesAndMethods = {};

matches.forEach(match => {
  const classNameCapture = match.captures.find(capture => capture.name === 'class-name');
  if (classNameCapture) {
    const className = classNameCapture.node.text;
    if (!classPropertiesAndMethods[className]) {
      classPropertiesAndMethods[className] = {
        properties: [],
        methods: []
      };
    }
    const propertyCaptures = match.captures.filter(capture => capture.name === 'property-name');
    propertyCaptures.forEach(propertyCapture => {
      classPropertiesAndMethods[className].properties.push(propertyCapture.node.text);
    });
    const methodCaptures = match.captures.filter(capture => capture.name === 'method-name');
    methodCaptures.forEach(methodCapture => {
      classPropertiesAndMethods[className].methods.push(methodCapture.node.text);
    });
  }
});

console.log(classPropertiesAndMethods);