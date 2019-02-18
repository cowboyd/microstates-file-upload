import { reduce } from 'microstates';

import Upload from './upload';

export default class Uploader {
  uploads = [Upload];

  get ratioCompleted() {
    return reduce(this.uploads, (sum, upload) => {
      return sum + upload.ratioCompleted / this.uploads.length;
    }, 0);
  }

  get percentageCompleted() {
    return this.ratioCompleted.toFixed(2) * 100;
  }

  addFiles(files) {
    return reduce(files, (uploader, file) => {
      let upload = Upload.New.create({ file });
      return uploader.uploads.push(upload);
    }, this);

  }
}
