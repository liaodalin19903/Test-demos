const Parser = require("tree-sitter");
const JavaScript = require('tree-sitter-javascript');
const { assert } = require("chai");

let parser = new Parser()
parser.setLanguage(JavaScript)

let input = 'abc + cde'

let tree = parser.parse(input)

