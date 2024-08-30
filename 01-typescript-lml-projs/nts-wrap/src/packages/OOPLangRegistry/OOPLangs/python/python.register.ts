import { LanguageRegistry } from '../../languageRegistry';
import { pythonQS } from './python.qs';

export function registerPython(registry: LanguageRegistry) {
  registry.registerLanguage({
    langName: 'Python',
    commonFeats: {
      'class:inheritance': true,
      'class:abstract-class': true,
      'class:multi-inheritance': true,
      'class:combination': true,
      'class:aggregation': true,
      'interface:interface-implement': true,
      'interface:interface-inheritance': false,
      'mixins:class': false
    },
    specialFeats: ['MagicMethods', 'Metaclasses', 'Decorators', 'DuckTyping', '@property decorator'],  // https://segmentfault.com/q/1010000045203600
    qs: pythonQS
  });
}