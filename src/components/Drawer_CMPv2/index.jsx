import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";

import { Overlay, DrawerBody } from "./styles";

export default class Drawer_CLS extends React.Component {
  constructor(props) {
    super(props);

    this.isOpen = false
  }

  render = () => {
    return this.isOpen
      ? ReactDOM.createPortal(
          <>
            <Overlay />
            <DrawerBody>{this.props.children}</DrawerBody>
          </>,
          document.body
        )
      : null;
  };
}

// const Drawer = ({ isOpen, hide, children, closeUrl }) => {
//   return isOpen
//     ?
//     : null;
// };

// export default Drawer;

// export const useDrawerUtils = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const hideDrawer = () => {
//     document.querySelector("body").classList.remove("no-scoll");
//     setIsOpen(false);
//   };

//   const openDrawer = () => {
//     document.querySelector("body").classList.add("no-scoll");
//     setIsOpen(true);
//   };

//   return [isOpen, hideDrawer, openDrawer];
// };
