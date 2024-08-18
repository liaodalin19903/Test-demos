import { LanguageRegistry } from './languageRegistry';
import { registerPython } from './langs/python.register';

const langRegistry = new LanguageRegistry();

// 注册语言：
registerPython(langRegistry);

//console.log(registry.getAllLanguages());

export { langRegistry }