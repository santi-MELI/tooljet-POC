import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { history } from '@/_helpers';
import { authenticationService, tooljetService } from '@/_services';
import { Viewer } from '@/Editor';
import Toast from '@/_ui/Toast';
import '@/_styles/theme.scss';
import 'emoji-mart/css/emoji-mart.css';
import { AppLoader } from '@/AppLoader';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchedMetadata: false,
    };
  }

  fetchMetadata = () => {
    if (this.state.currentUser) {
      tooljetService.fetchMetaData().then((data) => {
        localStorage.setItem('currentVersion', data.installed_version);
      });
    }
  };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) => {
      this.setState({ currentUser: x }, this.fetchMetadata);
      setInterval(this.fetchMetadata, 1000 * 60 * 60 * 1);
    });
  }

  logout = () => {
    authenticationService.logout();
    history.push('/login');
  };

  render() {
    let toastOptions = {
      style: {
        wordBreak: 'break-all',
      },
    };

    return (
      <Suspense fallback={null}>
        <BrowserRouter history={history} basename={window.public_config?.SUB_PATH || '/'}>
          <div className="main-wrapper" data-cy="main-wrapper">
            <Route exact path="/" component={AppLoader} />
            <Route exact path="/apps/:id/:pageHandle?" component={AppLoader} />
            <Route exact path="/applications/:id/versions/:versionId/:pageHandle?" component={Viewer} />
            <Route exact path="/applications/:slug/:pageHandle?" component={Viewer} />
          </div>
        </BrowserRouter>
        <Toast toastOptions={toastOptions} />
      </Suspense>
    );
  }
}

export { App };
