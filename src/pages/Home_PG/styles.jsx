import styled from "styled-components";
import colors from "../../styles/colors";
import { mediaQuery } from "../../styles/global";

const mainBgColor = `rgba(${colors.primary.rgb.r},${colors.primary.rgb.g},${colors.primary.rgb.b},0.3)`;
// const formBgColor = `rgba(${colors.secondary.rgb.r},${colors.secondary.rgb.g},${colors.secondary.rgb.b}, 1)`;

export const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 250px;
`;

export const Main = styled.main`
  background: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding: 2.4rem;

  .form-wrapper {
    /*background-color: ${colors.secondary.hex};*/
    background-color: #625656;
    color: ${colors.white.hex};
  }

  h3 {
    text-align: right;
  }
  label {
    color: ${colors.white.hex};
  }

  ${mediaQuery[1]} {
    padding: 4.8rem;
  }
`;
