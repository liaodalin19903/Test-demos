import { LanguageRegistry } from '../languageRegistry';

export function registerPython(registry: LanguageRegistry) {
  registry.registerLanguage({
    name: 'Python',
    features: ['语法简洁', '丰富的科学计算库', '易于学习']
  });
}