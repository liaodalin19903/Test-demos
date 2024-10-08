import { CAINode, CAIAttr, CAIMethod } from "@sma/shared-types";
import { ASTNode } from "../interfaces";


export class TypeScript implements ASTNode {
  getCAIs(path: string): CAINode[] {
    throw new Error("Method not implemented.");
  }
  getAttrs(path: string, cainame: string): CAIAttr[];
  getAttrs(cai: CAINode): CAIAttr[];
  getAttrs(path: unknown, cainame?: unknown): string[] {
    throw new Error("Method not implemented.");
  }
  getMethods(path: string, cainame: string): CAIMethod[];
  getMethods(cai: CAINode): CAIMethod[];
  getMethods(path: unknown, cainame?: unknown): string[] {
    throw new Error("Method not implemented.");
  } 
  
}