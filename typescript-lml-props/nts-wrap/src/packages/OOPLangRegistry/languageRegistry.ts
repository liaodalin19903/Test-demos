import { OOPLang } from './OOPLangFeatsInterface';

class LanguageRegistry {
  private registeredLanguages: Map<string, OOPLang.OOPLangFeats> = new Map();

  registerLanguage(language: OOPLang.OOPLangFeats) {
    this.registeredLanguages.set(language.langName, language);
  }

  getLanguage(langName: string): OOPLang.OOPLangFeats | undefined {
    return this.registeredLanguages.get(langName);
  }

  getAllLanguages(): OOPLang.OOPLangFeats[] {
    return Array.from(this.registeredLanguages.values());
  }
}

export { LanguageRegistry };