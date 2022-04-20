import * as fs from 'fs';
import * as process from 'node:child_process';

function existOrNot(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, async (err, stat) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function mkdirFolder(name) {
  return new Promise((resolve, reject) => {
    process.exec(`mkdir ${name}`, async function (error, stdout, stderr) {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

const utils = { existOrNot, mkdirFolder };

export default utils;
