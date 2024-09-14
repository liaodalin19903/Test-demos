import * as ts from 'typescript';
 
// 初始化编译器宿主
const host = ts.createCompilerHost({});
 
// 设置文件内容，可以是字符串或函数来获取文件内容
host.getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget) => {
  const content = `
    class Base {}
    class Derived extends Base {}
  `;
  const sourceFile = ts.createSourceFile(fileName, content, languageVersion);
  return sourceFile;
};
 
// 编译器配置
const program = ts.createProgram({
  rootNames: ['index.ts'], // 假设的文件名
  options: {
    target: ts.ScriptTarget.ES2015,
    module: ts.ModuleKind.CommonJS
  },
}, host);
 
// 获取类型检查器
const checker = program.getTypeChecker();
 
// 获取源文件
const sourceFile = program.getSourceFile('index.ts');
 
// 遍历源文件中的节点
ts.forEachChild(sourceFile!, visit);
 
function visit(node: ts.Node) {
  // 检查是否为类声明
  if (ts.isClassDeclaration(node)) {
    // 获取类名
    const className = node.name!.text;
    // 获取类的符号
    const symbol = checker.getSymbolAtLocation(node.name!);
    if (symbol) {
      // 获取继承类的符号
      const baseSymbol = checker.getBaseConstraintOfType(checker.getTypeAtLocation(node));
      if (baseSymbol) {
        console.log(`${className} extends ${baseSymbol.name}`);
      }
    }
  }
  // 递归遍历子节点
  ts.forEachChild(node, visit);
}