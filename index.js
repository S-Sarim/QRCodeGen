import inquirer from 'inquirer';
import qrcode from 'qrcode';
import readline from 'readline';
import fs from 'fs';
import { url } from 'inspector';
import path from 'path';

const filePath = './getUrls.txt';
const urlsToGenerate = [];
const folder = 'Generated Images';

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}


const readStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  urlsToGenerate.push(line);
});

rl.on('close', () => {
  for (const line of urlsToGenerate) {
    const url = line;
    const fileName = url.replace(/\.com/g, '');
    const filePath = path.join(folder,  fileName + '.png')
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    qrcode.toFile(filePath, url, (err) => {
            if (err) {
              console.error('Error generating QR code:', err);
            } else {
              console.log('QR code generated successfully! Check ' + filePath);
            }
          });
    fs.appendFile("./URL.txt", "\n" +  url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
});
