import React from "react";
import ReactDOM from "react-dom";

import { Overlay, DrawerBody } from "./styles";

export default class Drawer_CLS extends React.Component {
  constructor(props) {
    super(props);

    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    this.forceUpdate();
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