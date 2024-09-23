import * as fs from 'fs';

export function base64ToImage(base64Data: string, outputPath: string) {
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputPath, buffer);
}
