import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }
    html{font-size:10px;}
    h1,.h1-font-size {font-size: 5.96rem}
    h2,.h2-font-size {font-size: 4.768rem}
    h3,.h3-font-size {font-size: 3.815rem}
    h4,.h4-font-size {font-size: 3.052rem}
    h5,.h5-font-size {font-size: 2.441rem}
    h6,.h6-font-size {font-size: 1.953rem}
    p, .p-font-size  {font-size: 1.563rem}
`;
