import fs from 'fs';

const logger = (msg: string) => {
  fs.appendFile(`${dirname}/.log`, `${new Date()} ${msg}\n`, () => {});
}

export default logger;