export type PrefixKey<P extends string = string, K extends string = string> = `${P}${Capitalize<K>}`;

export type Prefix<P extends string, T extends object> = {
  [K in keyof T as K extends string ? PrefixKey<P, K> : never]?: T[K];
};

interface AAA {
  name: string,
  age: number
}

interface BBB extends Prefix<'bbb', AAA> {
  eat: () => void 
}


export const b: BBB = {
  bbbName: 'name',
  eat: function (): void {
    throw new Error("Function not implemented.");
  }
}

console.log(b)