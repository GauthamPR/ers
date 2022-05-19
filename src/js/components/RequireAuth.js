import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

class RequireAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.location != "/" && !this.props.redirectURL) {
      console.log(this.props.location);
      this.props.setRedirectURL(this.props.location);
    }
    return !this.props.account ? (
      <Navigate to="/public/connect" replace />
    ) : !this.props.user ? (
      <Navigate to="/public/login" replace />
    ) : (
      <Outlet />
    );
  }
}

function withHook(Component) {
  return function WrappedComponent(props) {
    let location = useLocation();
    return <Component {...props} location={location.pathname} />;
  };
}

export default withHook(RequireAuth);
