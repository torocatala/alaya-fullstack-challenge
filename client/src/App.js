import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import Navbar from './Nav/components/Navbar';
import LoginPage from './Authentication/pages/LoginPage/LoginPage';
import SignupPage from './Authentication/pages/SignupPage/SignupPage';



const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
  return (
      <ThemeProvider theme={theme}>
          <div className="w-100">
            <Provider store={props.store}>
                <Navbar />
                <div className="w-100 pt-5 mt-5">
                    <BrowserRouter>
                      <Switch>
                          <Route path="/" exact component={PostListPage} />
                          <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                          <Route path="/login" exact component={LoginPage} />
                          <Route path="/signup" exact component={SignupPage} />
                      </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
          </div>
      </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
