const fs = require('fs');
const path = require('path');
const walker = require('./utils/ast/walker');

// 这里需要一个解析器，我们假设使用 tree-sitter
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const TypeScript = require('tree-sitter-typescript').typescript;
const Python = require('tree-sitter-python');
const Go = require('tree-sitter-go');

function parseFile(code, language) {
  const parser = new Parser();
  parser.setLanguage(language);
  return parser.parse(code);
}

function findCAI(ast) {
  const caiNodes = walker(ast.rootNode, ['class_declaration', 'interface_declaration', 'method_definition']);
  
  return caiNodes.map(node => {
    let type = '未知';
    if (node.type === 'class_declaration') {
      type = node.children.some(child => child.type === 'abstract') ? '抽象类' : '类';
    } else if (node.type === 'interface_declaration') {
      type = '接口';
    } else if (node.type === 'method_definition') {
      type = '方法';
    }

    return {
      type,
      name: node.children.find(child => child.type === 'identifier')?.text,
      loc: node.startPosition
    };
  });
}

const dataDir = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDir);

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  const code = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(file);

  try {
    let ast;
    switch (ext) {
      case '.js':
        ast = parseFile(code, JavaScript);
        break;
      case '.ts':
        ast = parseFile(code, TypeScript);
        break;
      case '.py':
        ast = parseFile(code, Python);
        break;
      case '.go':
        ast = parseFile(code, Go);
        break;
      default:
        console.log(`不支持的文件类型: ${file}`);
        return;
    }

    const result = findCAI(ast);

    console.log(`文件: ${file}`);
    console.log(JSON.stringify(result, null, 2));
    console.log('-------------------');
  } catch (error) {
    console.error(`解析文件 ${file} 时出错: ${error.message}`);
  }
});