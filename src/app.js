import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { utils } from "ethers";

import WalletConnector from "./js/components/WalletConnector.js";
import ErrorScreen from "./js/components/ErrorScreen.js";
import Login from "./js/components/Login.js";
import AnswerSheetUploader from "./js/components/AnswerSheetUploader.js";
import NavBar from "./js/components/NavBar.js";
import RequireAuth from "./js/components/RequireAuth.js";
import ManageExams from "./js/components/ManageExams.js";
import ManageReviewers from "./js/components/ManageReviewers.js";
import Evaluate from "./js/components/Evaluate.js";
import Evaluator from "./js/components/Evaluator.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      account: null,
      user: null,
      err: null,
      redirectURL: null,
    };
    this.setError = this.setError.bind(this);
    this.setAccount = this.setAccount.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setRedirectURL = this.setRedirectURL.bind(this);
  }

  // Action to be set error for app (passed as props)
  setError(err) {
    this.setState({
      err,
    });
  }

  // Action to be performed on event: wallet_connection
  setAccount(account) {
    let properAccount = utils.getAddress(account);
    this.setState({
      account: properAccount,
    });
  }

  // Action to be performed on event: login
  setUser(user) {
    this.setState({
      user,
    });
  }

  // Action to be performed on event: require_auth
  setRedirectURL(redirectURL) {
    this.setState({
      redirectURL,
    });
  }

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          {this.state.err && (
            <ErrorScreen err={this.state.err} setError={this.setError} />
          )}
        </React.Fragment>
        <main style={{ marginTop: 60 }}>
          <BrowserRouter>
            <Routes>
              <Route path="public">
                <Route
                  path="connect"
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
                      redirectURL={this.state.redirectURL}
                      setUser={this.setUser}
                      setError={this.setError}
                    />
                  }
                />
              </Route>
              <Route
                path="/"
                element={
                  <React.Fragment>
                    {this.state.user && <NavBar user={this.state.user} />}
                    <RequireAuth
                      account={this.state.account}
                      user={this.state.user}
                      redirectURL={this.state.redirectURL}
                      setRedirectURL={this.setRedirectURL}
                    />
                  </React.Fragment>
                }
              >
                <Route
                  path="answer-sheet"
                  element={<AnswerSheetUploader user={this.state.user} />}
                />
                <Route path="manage-exams" element={<ManageExams />} />
                <Route path="manage-reviewers" element={<ManageReviewers />} />
                <Route path="evaluate">
                  <Route index element={<Evaluate />} />
                  <Route
                    path=":answerSheetId"
                    element={<Evaluator user={this.state.user} />}
                  />
                </Route>
                <Route path="*" element={<h1>There is nothing here!</h1>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
