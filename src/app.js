import React from "react";
import Main from "./js/components/main.js";

// states
const CLEAN = "CLEAN";
const META_INSTALLED = "META_INSTALLED";
const LOGGED_IN = "LOGGED_IN";

//errors
const META_NOT_FOUND = "META_NOT_FOUND";

function InstallPrompt() {
  return <h1>Metamask not found. Please install metamask.</h1>;
}
class ErrorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>{this.props.err}</h1>;
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { status: CLEAN, account: null };
    this.setAccount = this.setAccount.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  setLogin() {
    console.trace();
    this.setState({
      status: LOGGED_IN,
    });
  }
  setAccount(account) {
    this.setState({
      account,
    });
  }
  componentDidMount() {
    if (window.ethereum) {
      this.setState({
        status: META_INSTALLED,
      });
    } else {
      this.setState({
        err: META_NOT_FOUND,
      });
    }
  }
  render() {
    return (
      <div id="react-root" style={{ fontFamily: "inherit" }}>
        {this.state.status == CLEAN ? (
          <InstallPrompt />
        ) : !this.state.err ? (
          <Main
            account={this.state.account}
            status={this.state.status}
            setAccount={this.setAccount}
            setLogin={this.setLogin}
          />
        ) : (
          <ErrorScreen err={this.state.err} />
        )}
      </div>
    );
  }
}

export default App;
