import React from "react";
import ReactDOM from "react-dom";

import { Overlay, ModalBody, ModalContent, Title, Button } from "./styles";

const ModalMessage = ({
  isOpen,
  hide,
  title,
  children,
  style,
  btnAction,
  btnText,
  text,
}) => {
  const getTitle = () => {
    if (title) return <Title>{title}</Title>;
    return <></>;
  };
  const getButton = () => {
    if (btnAction && btnText)
      return <Button onClick={() => btnAction()}>{btnText}</Button>;
    return <></>;
  };
  return isOpen
    ? ReactDOM.createPortal(
        <>
          <Overlay onClick={hide} />
          <ModalBody style={style}>
            {getTitle()}
            <ModalContent>{children}</ModalContent>
            {/* {getButton()} */}
          </ModalBody>
        </>,
        document.body
      )
    : null;
};

export default ModalMessage;

export const useModalUtils = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const hideModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return [isOpen, hideModal, openModal];
};

/*
@author Igor Bedesqui
@descrition Componente usado para criar uma "gaveta", é usado o react Portal para cria-la fora do root, tornando possivel que o componente seja renderizado acima da aplicação inteira.
O componente deve receber um prop isOpen que define se será aberto ou não e um prop hide que deve ser um método com o poder de alterar isOpen
Também exporta um Hook que supre as necessidades do componente Drawer, esse hook retorna uma aray com o estado isOpen para passar ao Drawer, o método hideDrawer para esconder o drawer(também deve ser passado ao Drawer) e um método openDrawer para abrir o drawer
*/
