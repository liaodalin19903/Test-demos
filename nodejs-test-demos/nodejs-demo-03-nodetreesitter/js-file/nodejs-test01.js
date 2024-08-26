const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");
const { Query } = Parser;

const parser = new Parser();
parser.setLanguage(JavaScript);

const query = new Query(
  JavaScript,
  `
    (class_declaration
        name: (identifier) @class-name
        body: (class_body
            (method_definition
                name: (property_identifier) @method-name)
            (field_definition
                property: (property_identifier) @property-name)
        )
    )
  `
);

const tree = parser.parse(`
class Person {
    constructor() {}
    getName() {}
}

const TestPerson = class {
    sayHello() {}
};

class Person2 {
    age = 30;
    getAge() {}
}

const TestPerson2 = class {
    name = "John";
    sayGoodbye() {}
};
`);

const classTree = {};

const matches = query.matches(tree.rootNode);

console.log('matches: ', matches)

matches.forEach((item) => {
  const className = item.captures.find(capture => capture.name === 'class-name').node.text;
  
  if (!classTree[className]) {
    classTree[className] = {
      methods: [],
      properties: []
    };
  }
  
  item.captures.forEach(capture => {
    if (capture.name === 'method-name') {
      classTree[className].methods.push(capture.node.text);
    } else if (capture.name === 'property-name') {
      classTree[className].properties.push(capture.node.text);
    }
  });
});

console.log(JSON.stringify(classTree, null, 2));