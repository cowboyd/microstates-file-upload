import React, { Component } from 'react';

import Store from './store'
import Uploader from './uploader';
import UploaderController from './uploader-controller';
import { valueOf } from 'microstates';
import { append } from 'funcadelic';

import 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';


class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          Select one or more files to upload to https://api.frontside.io/dev/null
        </p>
        <Store type={Uploader} value={{ uploads: [] }} onChange={UploaderController}>
          {uploader => {
            let { ratioCompleted, percentageCompleted } = uploader;
            return (
              <div>
                <input type="file" multiple onChange={e => uploader.addFiles(e.target.files)}/>
                  <div>
                    <JSONPretty data={append(valueOf(uploader), { ratioCompleted, percentageCompleted })}/>
                  </div>
              </div>
            );
          }}
      </Store>
        </div>
    );
  }
}

export default App;
