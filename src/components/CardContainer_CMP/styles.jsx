import styled from 'styled-components';
import { mediaQuery } from '../../styles/global'

export const CardContainer = styled.div`
    width: 100%;
    min-height: 24rem;
    height: auto;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    ${mediaQuery[0]} {
        padding: 1rem 8em;
    }
    @supports (display: grid) {
        display: grid;
        grid-gap: 2rem;

        ${mediaQuery[0]} {
        grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        }
    }
`