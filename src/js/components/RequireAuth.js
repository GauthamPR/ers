import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

class RequireAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    if (this.props.location != "/" && !this.props.redirectURL) {
      this.props.setRedirectURL(this.props.location);
    }
  }

  render() {
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
