import styled from "styled-components";
import { mediaQuery } from "../../styles/global";

export const BreadcrumbNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  width: auto;
  height: auto;
  margin: 2rem auto;
  padding: 0 2.4rem;
`;

export const BreadCrumbItem = styled.span`
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  display: flex;
  align-items: center;

  padding: 2rem;

  font-size: 4.8rem;
  text-transform: uppercase;
  text-align: center;

  ${mediaQuery[0]} {
    font-size: 2.4rem;
  }
`;

export const BreadCrumbItemText = styled.span`
  display: none;
  ${mediaQuery[0]} {
    display: inline;
  }
`;
