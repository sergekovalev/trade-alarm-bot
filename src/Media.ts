import fs from 'fs';

class Media {
  static _shared : any;
  images: any = {}

  static instance() {
    if(!Media._shared) {
      Media._shared = new Media();
    }

    return this._shared.Media;
  }

  constructor() {
    this.images = {
      init: fs.readFileSync(`${global.dirname}/assets/bot.png`)
    }
  }
}

export default Media;
