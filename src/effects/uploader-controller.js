const URL = 'https://api.frontside.io/v1/dev/null';

/**
 * At its core, an effects is just a store callback
 * that is invoked every time the store changes.
 *
 * It matches a particular state and runs effects in
 * reaction to it.
 *
 * The "matching" is very raw using simple iteration and `if`
 * statements, so the area to develop is on how to make
 * advanced matches, manage side-effects as objects slide
 * in and out of matches.
 */
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
