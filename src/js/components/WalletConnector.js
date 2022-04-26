import React from "react";

import Main from "./main";

const META_NOT_FOUND = "META_NOT_FOUND";

function InstallPrompt() {
  return <h1>Metamask not found. Please install metamask.</h1>;
}

async function getAccount() {
  let accounts = await ethereum.request({ method: "eth_requestAccounts" });
  if (accounts && accounts[0]) {
    return accounts[0];
  } else {
    return undefined;
  }
}

class WalletConnector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      walletConnected: null,
      walletInstalled: null,
      disableConnectButton: null,
    };
    this.connectToWallet = this.connectToWallet.bind(this);
  }

  async connectToWallet() {
    this.setState({
      disableConnectButton: true,
    });
    let accounts = await ethereum.request({ method: "eth_requestAccounts" });
    this.props.setAccount(accounts[0]);
    this.setState({
      walletConnected: true,
    });
  }

  async componentDidMount() {
    // Check whether wallet is installed
    if (window.ethereum) {
      this.setState({
        walletInstalled: true,
      });

      // Get public address of account from metamask
      let account = await getAccount();
      this.props.setAccount(account);
    } else {
      this.props.setError({
        name: META_NOT_FOUND,
        message: "Metamask not found. Make sure plugin is installed",
      });

      this.setState({
        walletInstalled: false,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.walletInstalled ? (
          <React.Fragment>
            {this.state.walletConnected ? (
              <button
                disabled={this.state.disableConnectButton}
                onClick={this.connectToWallet}
              >
                Connect
              </button>
            ) : (
              <Main
                account={this.props.account}
                user={this.props.user}
                setUser={this.props.setUser}
                setError={this.props.setError}
              />
            )}
          </React.Fragment>
        ) : (
          <InstallPrompt />
        )}
      </React.Fragment>
    );
  }
}

export default WalletConnector;
