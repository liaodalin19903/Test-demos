const path = require('path');
const Parser  = require('tree-sitter');
const Typescript= require('tree-sitter-typescript').typescript;

const parser= new Parser();
parser.setLanguage(Typescript);