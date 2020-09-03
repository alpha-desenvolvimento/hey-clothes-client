import React from "react";
import {Button} from './styles' 

const Button_CMP = ({children, ...rest}) => {
  return <Button {...rest}>{children}</Button>;
};

export default Button_CMP;