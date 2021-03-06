import styled from "styled-components";

export const Hr = styled.hr`
  border-width: 1px;
  color: rgb(0 0 0 / 0.1);
  background-color: rgb(0 0 0 / 0.3);
  width: calc(100% - 5rem);
  margin: 0 auto;
`;

export const MainContainer = styled.form`
  z-index: 900;
  position: fixed;
  top: 0;
  width: 100vw;
  /* width: calc(100vw - 8rem); */
  right: 0;
  background-color: rgb(255 255 255 / 0.7);
  padding: 3vh 10vw;
  height: 10rem;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* border-bottom: 1px solid black; */
  flex-wrap: wrap;

  position: relative;

  .icon {
    position: absolute;
    top: 25%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 5rem;
  border: 0;
  background-color: rgb(255 255 255 / 0.7);
  border-radius: 100px;
`;

export const FilterContainer = styled.div``;

export const SubmitButton = styled.button`
  background: unset;
  border: 0;
`;
