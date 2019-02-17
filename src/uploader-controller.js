const URL = 'https://api.frontside.io/v1/dev/null';

export default function UploaderController(uploader) {
  for (let upload of uploader.uploads) {
    if (upload.isNew) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', URL);
      xhr.onload = () => latest = latest.finish(xhr)
      xhr.upload.onprogress = (e) => latest = latest.progress(e);
      xhr.onabort = () => latest.abort(xhr);
      xhr.send(upload.file);
      let latest = upload.start();
    }
  }
}
