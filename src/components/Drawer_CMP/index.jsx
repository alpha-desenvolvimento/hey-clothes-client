import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import { Overlay, DrawerBody, CloseIcon } from "./styles";

const Drawer = ({ isOpen, hide, children, closeUrl }) => {
  return isOpen
    ? ReactDOM.createPortal(
        <>
          {closeUrl ? (
            <Link to={closeUrl} onClick={hide}>
              <Overlay />
            </Link>
          ) : (
            <Overlay onClick={hide} />
          )}
          <DrawerBody>
            <CloseIcon>
              <FiX onClick={hide} />
            </CloseIcon>
            {children}
          </DrawerBody>
        </>,
        document.body
      )
    : null;
};

export default Drawer;

export const useDrawerUtils = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const hideDrawer = () => {
    document.querySelector("body").classList.remove("no-scoll");
    setIsOpen(false);
  };

  const openDrawer = () => {
    document.querySelector("body").classList.add("no-scoll");
    setIsOpen(true);
  };

  return [isOpen, hideDrawer, openDrawer];
};