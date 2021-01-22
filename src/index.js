import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background: #f7f7f7;
  margin: 0;
  margin-bottom: 120px;
}
* {
  box-sizing: border-box;
}
`
ReactDOM.render(
  <React.Fragment>
      <App />
      <GlobalStyle />
    </React.Fragment>,
  document.getElementById('root')
);
