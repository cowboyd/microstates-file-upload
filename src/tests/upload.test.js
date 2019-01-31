import Upload from '../upload';

describe('Creating an Upload', ()=> {
  let upload;
  beforeEach(()=> {
    let file = {
      name: 'avatar.png',
      size: 1048576, // 1MB in bytes
      type: 'image/png'
    };
    upload = Upload.New.create({ file });
  });
  it('is new', ()=> {
    expect(upload.isNew).toBe(true);
  });

  it('has no visible progress', ()=> {
    expect(upload.ratioCompleted).toEqual(0);
    expect(upload.percentageCompleted).toEqual(0);
  });

  it('has no running time', ()=> {
    expect(upload.runningTimeMillis).toBe(0);
  });

  describe('starting the upload', ()=> {
    let started;

    beforeEach(()=> {
      started = upload.start();
    });

    it('is started', ()=> {
      expect(started.isStarted).toEqual(true);
    });

    describe('registering progress', ()=> {
      let more;
      beforeEach(()=> {
        more = started.progress({
          loaded: 100,
          total: 200
        });
      });
      it('still is in the started state', ()=> {
        expect(more.isStarted).toBe(true);
      });
      it('informs how much progress has been completed', ()=> {
        expect(more.ratioCompleted).toBe(0.5)
        expect(more.percentageCompleted).toBe(50)
      });
    });

    describe('finishing', ()=> {
      let finished;
      beforeEach(()=> {
        finished = started.finish({
          response: {hello: 'world'},
          responseType: 'application/json'
        });
      });
      it('has a non-zero runtime', ()=> {
        expect(finished.runningTimeMillis > 0).toBe(true)
      });
    });

  });

});
