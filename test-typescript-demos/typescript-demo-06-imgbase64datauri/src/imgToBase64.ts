import * as fs from 'fs';

function imageToBase64(imagePath: string): string {
    const imageData = fs.readFileSync(imagePath);
    return imageData.toString('base64');
}

// 示例用法
const imageFilePath = './001.jpg';
const base64Data = imageToBase64(imageFilePath) + "=";
console.log(base64Data);


import { base64ToImage } from './base64ToImg';

base64ToImage(base64Data, './output-001.jpg')

