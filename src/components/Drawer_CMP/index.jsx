import React from 'react';
import ReactDOM from "react-dom";

import { Overlay, DrawerBody } from './styles'; 

const Drawer = ({ isOpen, hide, children }) => {
    return(
        isOpen ? ReactDOM.createPortal(
            <>
                <Overlay onClick={hide} />
                <DrawerBody>
                    {children}
                </DrawerBody>
            </>,
            document.body
        ): null
    )
}

export default Drawer;

export const useDrawerUtils = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const hideDrawer = () => {
        setIsOpen(false)
    }

    const openDrawer = () =>{
        setIsOpen(true);
    }

    return [isOpen, hideDrawer, openDrawer];
}

/*
@author Igor Bedesqui
@descrition Componente usado para criar uma "gaveta", é usado o react Portal para cria-la fora do root, tornando possivel que o componente seja renderizado acima da aplicação inteira.
O componente deve receber um prop isOpen que define se será aberto ou não e um prop hide que deve ser um método com o poder de alterar isOpen
Também exporta um Hook que supre as necessidades do componente Drawer, esse hook retorna uma aray com o estado isOpen para passar ao Drawer, o método hideDrawer para esconder o drawer(também deve ser passado ao Drawer) e um método openDrawer para abrir o drawer
*/