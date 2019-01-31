import Union from './union';

class Upload {

  get file() {
    return this.state.file;
  }

  get ratioCompleted() {
    let { progress } = this.state;
    if (progress) {
      return progress.loaded / progress.total;
    } else {
      return 0;
    }
  }

  get percentageCompleted() {
    return this.ratioCompleted.toFixed(2) * 100;
  }

  get runningTimeMillis() {
    let { startedAt, endedAt } = this.state;
    if (startedAt) {
      if (endedAt) {
        return endedAt - startedAt;
      } else {
        return Date.now() - startedAt;
      }
    } else {
      return 0;
    }
  }
}

export default Union({
  New: Upload => class extends Upload {
    start() {
      return this.toStarted({
        startedAt: Date.now(),
        progress: {
          lengthComputable: true,
          loaded: 0,
          total: this.file.size
        }
      });
    }
  },
  Started: Upload => class extends Upload {
    progress(progress) {
      return this.toStarted({ progress });
    }

    finish(xhr) {
      let { response, responseType } = xhr;

      return this.toFinished({
        response,
        responseType,
        endedAt: Date.now(),
      })
    }

    error(error) {
      return this.toErrored({
        error,
        endedAt: Date.now()
      });
    }

    cancel() {
      return this.toCancelled();
    }

    abort() {
      return this.toAborted({
        endedAt: Date.now()
      });
    }
  },
  Cancelled: Upload => class extends Upload {},
  Finished: Upload => class extends Upload {},
  Errored: Upload => class extends Upload {},
  Aborted: Upload => class extends Upload {}
}, Upload);
