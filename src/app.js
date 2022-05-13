import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import WalletConnector from "./js/components/WalletConnector.js";
import ErrorScreen from "./js/components/ErrorScreen.js";
import Login from "./js/components/Login.js";
import AnswerSheetUploader from "./js/components/AnswerSheetUploader.js";
import NavBar from "./js/components/NavBar.js";
import RequireAuth from "./js/components/RequireAuth.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { status: null, account: null, user: null, err: null };
    this.setError = this.setError.bind(this);
    this.setAccount = this.setAccount.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  // Action to be set error for app (passed as props)
  setError(err) {
    this.setState({
      err,
    });
  }

  // Action to be performed on event: wallet_connection
  setAccount(account) {
    this.setState({
      account,
    });
  }

  // Action to be performed on event: login
  setUser(user) {
    this.setState({
      user,
    });
  }

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          {this.state.err && (
            <ErrorScreen err={this.state.err} setError={this.setError} />
          )}
          {this.state.user && <NavBar user={this.state.user} />}
        </React.Fragment>
        <main style={{ marginTop: 60 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <React.Fragment>
                      <WalletConnector
                        account={this.state.account}
                        user={this.state.user}
                        setAccount={this.setAccount}
                        setUser={this.setUser}
                        setError={this.setError}
                      />
                    </React.Fragment>
                  }
                />
                <Route
                  path="login"
                  element={
                    <Login
                      user={this.state.user}
                      account={this.state.account}
                      setUser={this.setUser}
                      setError={this.setError}
                    />
                  }
                />
                <Route
                  path="answer-sheet"
                  element={
                    <React.Fragment>
                      <RequireAuth
                        account={this.state.account}
                        user={this.state.user}
                      />
                      <AnswerSheetUploader user={this.state.user} />
                    </React.Fragment>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
