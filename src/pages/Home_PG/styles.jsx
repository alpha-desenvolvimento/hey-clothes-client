import styled from "styled-components";
import colors from "../../styles/colors";

const mainBgColor = `rgba(${colors.primary.rgb.r},${colors.primary.rgb.g},${colors.primary.rgb.b},0.3)`;
// const formBgColor = `rgba(${colors.secondary.rgb.r},${colors.secondary.rgb.g},${colors.secondary.rgb.b}, 1)`;

export const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 90%;
  max-width: 250px;
`;
export const Main = styled.main`
  background: ${mainBgColor};
  width: 100vw;
  height: 100vh;
  padding: 3rem;

  .form-wrapper {
    background-color: ${colors.secondary.hex};
    color: ${colors.white.hex};
    
  }
  h3 {
    text-align: right;
  }
  label{
    color: ${colors.white.hex};
  }
  input {
    color: ${colors.white.hex};
    border-bottom: 2px solid ${colors.white.hex};
    text-align: center;

    &:focus {
      border-bottom: 2px solid ${colors.tertiary.hex};
    }
    &::placeholder {
      color: ${colors.white.hex}99;
    }
  }
  button{
    background-color: ${colors.tertiary.hex};
    border:0;
    color: ${colors.white.hex};
  }
`;
