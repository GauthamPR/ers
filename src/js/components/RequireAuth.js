import React from "react";
import { Navigate, Outlet } from "react-router-dom";

class RequireAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.account ? (
      <Navigate to="/" replace />
    ) : (
      !this.props.user ?<Navigate to="/login" replace />:<Outlet />
    );
  }
}

export default RequireAuth;
