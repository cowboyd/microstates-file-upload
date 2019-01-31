// function ControlUploader(url, callback = x => x) {
//   let uploader = Store(Uploader.create(), x => handle);

//   function handle(next) {
//     uploader = next;
//     callback(next);

//     for (let upload of uploader.uploads) {
//       if (upload.isNew) {
//         let xhr = new XMLHttpRequest();
//         xhr.open('POST', url);
//         xhr.onload = () => upload.finish(xhr);
//         xhr.upload.onprogress = (e) => upload.progress(e);
//         xhr.onabort = () => uploader.abort(xhr);
//         xhr.send();
//       }
//       if (upload.isCancelled.state) {
//         xhr.abort();
//         upload.abort();
//       }
//     }
//   }
//   return uploader;
// }

// when({ uploads: any.when({ isNew }) }, upload => {

// });

// const URL = '';

// let uploader = Controlled(Uploader)
//     .when( { uploads: each({ isNew: true }) }, transition => {
//       let xhr = new XMLHttpRequest();
//       xhr.open('POST', URL);
//       xhr.onload = () => transition(upload => upload.finish(xhr));
//       xhr.onload = () => transition(upload => upload.finish(xhr));
//       xhr.upload.onprogress = (e) => transition(upload => upload.progress(e));
//       xhr.onabort = () => transition(upload => upload.abort(xhr));
//       xhr.send();
//       transition(upload => upload.start(xhr));
//     })
//     .when({ uploads: every({ isCancelled })}, upload => {
//       upload.state.xhr.abort();
//       upload.abort();
//     })



// class Uploader {
//   @on({ uploads: each({ isNew }) })
//   makeRequest(upload) {
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', url);
//     xhr.onload = () => upload.finish(xhr);
//     xhr.upload.onprogress = (e) => upload.progress(e);
//     xhr.onabort = () => uploader.abort(xhr);
//     xhr.send();
//     upload.start(xhr);
//   }
// }
