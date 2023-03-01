import React, { Suspense } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { history } from '@/_helpers';
import { Viewer } from '@/Editor';
import Toast from '@/_ui/Toast';
import '@/_styles/theme.scss';
import 'emoji-mart/css/emoji-mart.css';
import { AppLoader } from '@/AppLoader';
import { CleanAppLoader } from '@/CleanAppLoader';

const App = () => {
  const toastOptions = {
    style: {
      wordBreak: 'break-all',
    },
  };

  return (
    <Suspense fallback={null}>
      <HashRouter history={history} base={window.public_config?.SUB_PATH || '/'}>
        <div className="main-wrapper" data-cy="main-wrapper">
          <Route exact path="/" component={CleanAppLoader} />
          <Route exact path="/home" component={AppLoader} />
          <Route exact path="/apps/:id/:pageHandle?" component={AppLoader} />
          <Route exact path="/applications/:id/versions/:versionId/:pageHandle?" component={Viewer} />
          <Route exact path="/applications/:slug/:pageHandle?" component={Viewer} />
        </div>
      </HashRouter>
      <Toast toastOptions={toastOptions} />
    </Suspense>
  );
};

export { App };
