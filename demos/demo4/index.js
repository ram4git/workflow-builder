import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store';
import { Demo4 } from './demo4';
import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyDWS49tB7osCdfWmun7zMZ7ilnYZdqE4ug",
  authDomain: "flowchart2-e1365.firebaseapp.com",
  databaseURL: "https://flowchart2-e1365.firebaseio.com",
  projectId: "flowchart2-e1365",
  storageBucket: "flowchart2-e1365.appspot.com",
  messagingSenderId: "173406196566"
}

firebase.initializeApp(config);

window.onload = () => {
  const rootEl = document.getElementById('root');
  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      rootEl
    );
  };

  render(Demo4);
  if (module.hot) module.hot.accept('./demo4', () => render(Demo4));
};
