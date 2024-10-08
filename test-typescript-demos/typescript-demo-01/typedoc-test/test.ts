
/**
 * Defines the available reflection kinds.
 * @category Reflections
 */
export enum ReflectionKind {
  Project = 0x1,
  Module = 0x2,
  Namespace = 0x4,
  Enum = 0x8,
  EnumMember = 0x10,
  Variable = 0x20,
  Function = 0x40,
  Class = 0x80,
  Interface = 0x100,
  Constructor = 0x200,
  Property = 0x400,
  Method = 0x800,
  CallSignature = 0x1000,
  IndexSignature = 0x2000,
  ConstructorSignature = 0x4000,
  Parameter = 0x8000,
  TypeLiteral = 0x10000,
  TypeParameter = 0x20000,
  Accessor = 0x40000,
  GetSignature = 0x80000,
  SetSignature = 0x100000,
  TypeAlias = 0x200000,
  Reference = 0x400000,
  /**
   * Generic non-ts content to be included in the generated docs as its own page.
   */
  Document = 0x800000,
}



function getKindString(kind: ReflectionKind): string {
  return ReflectionKind[kind].replace(
      /(.)([A-Z])/g,
      (_m, a: string, b: string) => a + " " + b.toLowerCase(),
  );
}

const str = getKindString(ReflectionKind.Project)
console.log(str)  // Project


