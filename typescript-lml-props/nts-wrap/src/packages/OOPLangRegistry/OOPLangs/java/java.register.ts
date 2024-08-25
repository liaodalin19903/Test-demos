import { LanguageRegistry } from '../../languageRegistry';

export function registerJava(registry: LanguageRegistry) {
  registry.registerLanguage({
    langName: 'Java',
    commonFeats: {
      'class:inheritance': true,
      'class:abstract-class': true,
      'class:multi-inheritance': false,
      'class:combination': true,
      'class:aggregation': true,
      'interface:interface-implement': true,
      'interface:interface-inheritance': true,
      'mixins:class': false
    },
    specialFeats: []  // https://segmentfault.com/q/1010000045203600
  });
}