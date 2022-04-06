import React from "react";
import axios from "axios";

import AnswerSheetUploader from "./AnswerSheetUploader";

const NOT_CONNECTED = "NOT_CONNECTED";
const CONNECTED = "CONNECTED";

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
      let nonceRes = await axios({
        method: "get",
        url: "/api/login/" + this.props.account,
      });
      let sign = await ethereum.request({
        method: "personal_sign",
        params: [nonceRes.data.nonce, this.props.account],
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
            {this.props.status != "LOGGED_IN" ? (
              <div>
                <div>Connected</div>
                <button
                  disabled={this.state.disableLoginButton}
                  onClick={this.login}
                >
                  Login
                </button>
              </div>
            ) : (
              <AnswerSheetUploader />
            )}
          </div>
        )}
      </main>
    );
  }
}

export default Main;
