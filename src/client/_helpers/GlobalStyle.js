import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

/* eslint-disable */

const GlobalStyle = createGlobalStyle`

${reset}

/* Custom global styles */

@import url('https://fonts.googleapis.com/css?family=Lato|Staatliches');


html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}  

body {
  -webkit-font-smoothing: antialiased;
  font-family: 'Lato', sans-serif; 
  background-color: #001011;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
`;
/* eslint-enable */

export default GlobalStyle;
