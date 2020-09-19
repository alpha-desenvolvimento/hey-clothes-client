import React from "react";

import { Spinner as StyledSpinner, Wrapper } from "./styles";

const Spinner = () => {
  return (
    <Wrapper>
      <StyledSpinner class="spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </StyledSpinner>
    </Wrapper>
  );
};

export default Spinner;
