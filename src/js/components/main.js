import React from "react";
import axios from "axios";

const NOT_CONNECTED = "NOT_CONNECTED";
const CONNECTED = "CONNECTED";

function makeId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function signMsg(account) {
  return new Promise((resolve, reject) => {
    ethereum.request(
      {
        method: "personal_sign",
        params: ["something", account],
        from: account,
      },
      (err, data) => {
        if (err) return reject(err);
        resolve(data.result);
      }
    );
  });
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: NOT_CONNECTED,
      disableConnectButton: false,
      disableLoginButton: false,
    };

    this.connectToMetaMask = this.connectToMetaMask.bind(this);
    this.login = this.login.bind(this);
  }
  async login() {
    this.setState({
      disableLoginButton: true,
    });
    try {
      let sign = await ethereum.request({
        method: "personal_sign",
        params: ["something", this.props.account],
        from: this.props.account,
      });
      let res = await axios({
        method: "post",
        url: "/api/login",
        data: {
          publicAddress: this.props.account,
          signature: sign,
        },
      });
      if (res.status == 200) {
        this.props.setLogin();
      }
    } catch (err) {
      console.log(err.response !== undefined ? err.response.data.error : err);
    }
  }

  async connectToMetaMask() {
    this.setState({
      disableConnectButton: true,
    });
    let accounts = await ethereum.request({ method: "eth_requestAccounts" });
    this.props.setAccount(accounts[0]);
    this.setState({
      status: CONNECTED,
    });
  }

  render() {
    return (
      <main style={{ margin: 20 }}>
        {this.state.status != CONNECTED ? (
          <button
            disabled={this.state.disableConnectButton}
            onClick={this.connectToMetaMask}
          >
            Connect
          </button>
        ) : (
          <div>
            <div>Connected</div>
            {this.props.status != "LOGGED_IN" && (
              <button
                disabled={this.state.disableLoginButton}
                onClick={this.login}
              >
                Login
              </button>
            )}
          </div>
        )}
      </main>
    );
  }
}

export default Main;
