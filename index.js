import inquirer from 'inquirer';
import qrcode from 'qrcode';
import fs from "fs"

inquirer
  .prompt([
    {
      message: "Enter the website URL: ",
      name: "url",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    const fileName = url.replace(/\.com/g, '')

    qrcode.toFile(fileName + '.png', url, (err) => {
      if (err) {
        console.error('Error generating QR code:', err);
      } else {
        console.log('QR code generated successfully! Check ' + fileName + '.png');
      }
    });

    fs.appendFile("./URL.txt", "\n" +  url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
