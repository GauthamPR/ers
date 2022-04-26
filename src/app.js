import React from "react";

import WalletConnector from "./js/components/WalletConnector.js";
import ErrorScreen from "./js/components/ErrorScreen.js";

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
      <div id="react-root" style={{ fontFamily: "inherit" }}>
        {this.state.err && (
          <ErrorScreen err={this.state.err} setError={this.setError} />
        )}
        <WalletConnector
          account={this.state.account}
          user={this.state.user}
          setAccount={this.setAccount}
          setUser={this.setUser}
          setError={this.setError}
        />
      </div>
    );
  }
}

export default App;
