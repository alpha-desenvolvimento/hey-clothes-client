import React from 'react';

import { CardWrapper, CardImage, CardDescription, NameText, PriceText } from './styles'

const ProductCard = ({ name, price, photo ,...rest }) => {
    return(
        <CardWrapper>
        <CardImage src={photo} />
        <CardDescription>
            <NameText>{name}</NameText>
            <PriceText>R$ {price}</PriceText>
        </CardDescription>
        </CardWrapper>
    )
};

export default ProductCard;