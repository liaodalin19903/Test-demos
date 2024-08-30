export function splitUnquotedString(
    input: string,
    delimiter: string,
): string[] {
    if (input.startsWith(delimiter)) {
        return splitUnquotedString(
            input.substring(delimiter.length),
            delimiter,
        );
    }
    if (input.startsWith('"')) {
        // the part inside the quotes should not be split, the rest should
        const closingQuoteIndex = input.indexOf('"', 1);
        if (closingQuoteIndex === -1) {
            // Unmatched quotes, just split it
            return input.split(delimiter);
        }
        if (closingQuoteIndex === input.length - 1) {
            return [input];
        } else {
            const remainder = input.substring(closingQuoteIndex + 1);
            return [
                input.substring(0, closingQuoteIndex + 1),
                ...splitUnquotedString(remainder, delimiter),
            ];
        }
    } else {
        return input.split(delimiter);
    }
}



const inputString = '"Hello world, This is a test",Not quoted part';
const delimiter = ',';
const result = splitUnquotedString(inputString, delimiter);
console.log(result);

