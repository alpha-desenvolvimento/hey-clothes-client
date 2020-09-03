import styled from 'styled-components';

export const NavBar = styled.nav`
    width: 8rem;
    height: 100vh;
    position: fixed;
    background-color: "#B8B8B8";
`

export const NavItemsWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`

export const NavItem = styled.li`
    width: 100%;

    &::last-child {
        margin-top: auto;
    }
`