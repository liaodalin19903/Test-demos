import { Language } from './language';

class LanguageRegistry {
  private registeredLanguages: Map<string, Language> = new Map();

  registerLanguage(language: Language) {
    this.registeredLanguages.set(language.name, language);
  }

  getLanguage(name: string): Language | undefined {
    return this.registeredLanguages.get(name);
  }

  getAllLanguages(): Language[] {
    return Array.from(this.registeredLanguages.values());
  }
}

export { LanguageRegistry };