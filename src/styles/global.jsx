import { createGlobalStyle } from "styled-components";

export const breakpoints = [40, 64, 144];

export const mediaQuery = breakpoints.map(
  (bp) => `@media (min-width: ${bp}rem)`
);

export default createGlobalStyle`
    .no-scoll{
        overflow-y: hidden !important;
    }
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        min-height:100vh;
        -webkit-font-smoothing: antialiased !important;
        background-color: #f9f9f9;
        scroll-behavior: smooth;
    }
    body html #root {
        height: 100%;
    }
    .glass-effect{
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);   
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .15);
    
        backdrop-filter: blur(5px);
        color:red
    }
`;
