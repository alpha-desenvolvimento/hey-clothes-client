import { createGlobalStyle } from "styled-components";

export const breakpoints = [40, 64, 144];

export const mediaQuery = breakpoints.map(
  (bp) => `@media (min-width: ${bp}rem)`
);

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        min-height:100vh;
        -webkit-font-smoothing: antialiased !important;
    }
    body html #root {
        height: 100%;
    }
    :root{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }
`;