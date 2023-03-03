import { createGlobalStyle } from "styled-components";

import "modern-normalize";
import "react-toastify/dist/ReactToastify.css";

export const GlobalStyle = createGlobalStyle<any>`
 body {
  background-color: ${(p) => p.theme.colors.mainBackground};
  color: ${(p) => p.theme.colors.mainTextColor};
  margin: 0;
    font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  transition: color 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
#root{
  height: 100%;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
  margin-bottom: 0;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: currentColor;
}

`;
