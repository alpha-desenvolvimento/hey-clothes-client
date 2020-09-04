import React from 'react';

const useDrawerUtils = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const hideDrawer = () => {
        setIsOpen(false)
    }

    const openDrawer = () =>{
        setIsOpen(true);
    }

    return [isOpen, hideDrawer, openDrawer];
}

export default useDrawerUtils;

/*
@author Igor Bedesqui
@descrition Hook que supre as necessidades do componente Drawer, esse hook retorna uma aray com o estado isOpen para passar ao Drawer, o método hideDrawer para esconder o drawer(também deve ser passado ao Drawer) e um método openDrawer para abrir o drawer 
*/