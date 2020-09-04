import React from 'react';

import NavBar, { Main } from '../../components/NavBar_CMP'
import CardContainer from '../../components/CardContainer_CMP'
import Card from '../../components/ProductCard_CMP'
import Drawer, { useDrawerUtils } from '../../components/Drawer_CMP'

const Products_PG = () => {
    const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();

    return(
        <>
            <NavBar />
            <Main>
                <button onClick={openDrawer}>Drawer</button>
                <div style={{margin: "4rem auto"}} >
                    <h1 style={{width:"100%", textAlign: "center"}}>PLACEHOLDER DA BARRA DE PESQUISA</h1>
                </div>
                <CardContainer>
                    <Card name={"Camisa cinza"} price={"5,00"} photo={"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                    
                    <Card name={"Camisa cinza"} price={"5,00"} photo={"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />

                    <Card name={"Camisa cinza"} price={"5,00"} photo={"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />

                    <Card name={"Camisa cinza"} price={"5,00"} photo={"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                    
                    <Card name={"Camisa cinza"} price={"5,00"} photo={"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                </CardContainer>
            </Main>
            <Drawer isOpen={isOpen} hide={hideDrawer}>
                <h1>Hej</h1>
            </Drawer>
        </>
    )
}

export default Products_PG