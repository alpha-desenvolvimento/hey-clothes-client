import { createGlobalStyle } from "styled-components";

export const fontSize = {
  h1: 5.96,
  h2: 4.768,
  h3: 3.815,
  h4: 3.052,
  h5: 2.441,
  h6: 1.953,
  p: 1.563,
};

export default createGlobalStyle`
  :root{
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  html{font-size:10px;}
    
  h1,.h1-font-size {font-size: ${fontSize.h1}rem}
  h2,.h2-font-size {font-size: ${fontSize.h2}rem}
  h3,.h3-font-size {font-size: ${fontSize.h3}rem}
  h4,.h4-font-size {font-size: ${fontSize.h4}rem}
  h5,.h5-font-size {font-size: ${fontSize.h5}rem}
  h6,.h6-font-size {font-size: ${fontSize.h6}rem}
  p, .p-font-size  {font-size: ${fontSize.p}rem}
`;
