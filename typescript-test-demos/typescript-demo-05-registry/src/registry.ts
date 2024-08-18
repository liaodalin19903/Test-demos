interface Language {
  name: string;
  features: string[];
}

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

// 使用示例
const registry = new LanguageRegistry();

// #region 注册
registry.registerLanguage({
  name: 'JavaScript',
  features: ['动态类型', '广泛的库支持', '前端开发主流语言']
});

registry.registerLanguage({
  name: 'Python',
  features: ['语法简洁', '丰富的科学计算库', '易于学习']
});

//#endregion

console.log(registry.getAllLanguages());

export { registry }