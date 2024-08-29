import ts from 'typescript'

ts.SymbolFlags['xxx'] = 'yyy'
console.log(ts.SymbolFlags['xxx'])

const symbolConverters: {
  [K in ts.SymbolFlags]?: string 
} = {
  [ts.SymbolFlags.RegularEnum]: 'convertEnum',
}

const allConverterFlags = Object.keys(symbolConverters).reduce(
  (v, k) => v | +k,
  0,
);

console.log(allConverterFlags)