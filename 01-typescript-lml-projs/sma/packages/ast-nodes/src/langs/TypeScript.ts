import { CAINode, CAIAttr, CAIMethod, OutClassFunc } from "@sma/shared-types";
import { ASTNode, LangBase } from "../interfaces";
export class TypeScript implements LangBase {
  
  //#region 获取AST关键字
  getFuncASTWord(): string[] {
    return ['function_declaration', 'arrow_function'];
  }

  getClassASTWord(): string[] {
    return ['class_declaration'];
  }

  getInterfaceASTWord(): string[] {
    return ['interface_declaration'];
  }

  getClassAttrASTWord(): string[] {
    return ['public_field_definition'];
  }

  getClassMethodASTWord(): string[] {
    return ['method_definition', 'arrow_function'];
  }
  //#endregion

  /* 获取AST节点 */
  getClassASTNode(abpath: string): CAINode[] {
    throw new Error("Method not implemented.");
  }
  getInterfaceASTNode(abpath: string): CAINode[] {
    throw new Error("Method not implemented.");
  }
  getFuncASTNode(abpath: string): OutClassFunc[] {
    throw new Error("Method not implemented.");
  }

}