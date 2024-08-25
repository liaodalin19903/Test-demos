import { LanguageRegistry } from './languageRegistry';
import { registerPython } from './OOPLangs/python/python.register';
import { registerJava } from './OOPLangs/java/java.register';
import { registerTypeScript } from './OOPLangs/typescript/typescript.register';

const langRegistry = new LanguageRegistry();

// 注册语言：
registerPython(langRegistry);
registerJava(langRegistry);
registerTypeScript(langRegistry);


export { langRegistry }

