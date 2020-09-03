import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (currentUser) {
          return <RouteComponent {...routeProps} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;

/*
@author Igor Bedesqui
@descrition Componente usado para criar rotas que devem ser acessadas apenas por usuários logados, caso um usuário não logado acesse a rota ele será redirecionado para "/".
O componente usa o AuthContext para definir a existencia de um usuário
*/