import { LanguageRegistry } from '../languageRegistry';

export function registerTypeScript(registry: LanguageRegistry) {
  registry.registerLanguage({
    langName: 'TypeScript',
    commonFeats: {
      'class:inheritance': true,
      'class:abstract-class': true,
      'class:multi-inheritance': false,
      'class:combination': true,
      'class:aggregation': true,
      'interface:interface-implement': true,
      'interface:interface-inheritance': false,
      'mixins:class': true
    },
    specialFeats: ['Decorators', 'Generics']  // https://segmentfault.com/q/1010000045203600
  });
}

