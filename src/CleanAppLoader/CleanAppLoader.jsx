import React from 'react';
import { Editor } from '../CleanEditor/Editor';

const AppLoaderComponent = (props) => {
  return <Editor {...props} />;
};

export const CleanAppLoader = AppLoaderComponent;
