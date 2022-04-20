import fs from 'fs'
import process from 'child_process'

const utils = {
    existOrNot(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, async (err, stat) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    },
    mkdirFolder(name) {
        return new Promise((resolve, reject) => {
            process.exec(`mkdir ${name}`, async function (error, stdout, stderr) {
                if (error) {
                    reject(false);
                } else {
                    resolve(true);
                }
            })
        });
    }
}

export default utils;
