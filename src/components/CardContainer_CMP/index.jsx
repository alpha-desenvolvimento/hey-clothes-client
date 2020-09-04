import React from 'react';

import { CardContainer as Container } from './styles';

const CardContainer = ({children}) => {
    return(
        <Container>
            {children}
        </Container>
    )
}

export default CardContainer