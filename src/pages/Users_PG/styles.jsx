import styled from "styled-components";

export const Table = styled.table`
  display: block;
  padding: 5rem 5rem;
  tr {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    th,
    td {
      text-align: left;
      width: 100%;
      margin-bottom: 2rem;
      width: 49%;
    }

    td {
      border-bottom: 1px solid rgb(0 0 0 / 0.3);
      padding: 0.5rem 1rem 0.3rem;
    }
  }
  tr th {
    padding-left: 3rem;
  }
`;
