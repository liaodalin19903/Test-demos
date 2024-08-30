import { propertyType, methodType, CAIBase, CAIInheritChainData, callMethodOnEarth, OOPLanAstCommonFunc } from '../interfaces'

export class TypeScriptASTWrap implements OOPLanAstCommonFunc {
  langName: string | undefined = undefined

  constructor(langName: string | undefined) {
    this.langName = langName
  }

  getClasses(path: string): CAIBase[] {
    throw new Error('Method not implemented.');
  }
  getProperties(cai: CAIBase): propertyType[] {
    throw new Error('Method not implemented.');
  }
  getMethods(cai: CAIBase): methodType[];
  getMethods(path: string): methodType[];
  getMethods(path: string, langName?: string): methodType[];
  getMethods(path: unknown, langName?: unknown): methodType[] {
    throw new Error('Method not implemented.');
  }
  getCAIInheritChain(cai: CAIBase): CAIInheritChainData;
  getCAIInheritChain(path: string): CAIInheritChainData[];
  getCAIInheritChain(path: unknown): CAIInheritChainData | CAIInheritChainData[] {
    throw new Error('Method not implemented.');
  }
  getBeCalledMethods(method: methodType): methodType[] {
    throw new Error('Method not implemented.');
  }
  getCallOtherMethods(method: methodType): callMethodOnEarth {
    throw new Error('Method not implemented.');
  }

}