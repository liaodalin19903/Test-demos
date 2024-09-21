const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');

const parser = new Parser();
parser.setLanguage(JavaScript);

const code = `
class C {
    A() {
        {
            class AInner {}
        }
        class B {
            
        }
    }
}

class A {
    constructor() {}
    B() {
        class C {
            
        }
    }
}

`;

// Parse the JavaScript code
const tree = parser.parse(code);

// AST type to readable name map
const treeTypeNameMap = {
    "class_declaration": "class",
    "method_definition": "method",
    "function_declaration": "function"
}

// Nodes that we consider to increment the depth level.
// For example, when we enter a new class body, or new statement block.
const depthNodes = [
    "class_body", "statement_block"
];
// Recursively traverse the syntax tree up to a certain depth
function findClassesAndMethods(node, currentDepth = 0, maxDepth = 3) {
    // If we reached the maximum depth, return
    if (currentDepth >= maxDepth) {
        return;
    }

    let nextDepth = currentDepth;
    // Only increment depth level if we encounter a new class body or statement block
    if (depthNodes.includes(node.type)) {
        nextDepth += 1;
    } else if (node.type in treeTypeNameMap) {
        const name = node.childForFieldName("name").text;
        console.log("-".repeat(currentDepth), treeTypeNameMap[node.type], name);
    }

    node.children.forEach(child => findClassesAndMethods(child, nextDepth, maxDepth))
}

// Start traversing from the root node
const res = findClassesAndMethods(tree.rootNode);
console.log(res)