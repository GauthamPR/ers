import React from "react";
import axios from "axios";

import AnswerSheetUploader from "./AnswerSheetUploader";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null,
      disableLoginButton: false,
    };

    this.login = this.login.bind(this);
  }

  async login() {
    this.setState({
      disableLoginButton: true,
    });

    try {
      // Get nonce of the particular public address
      let nonceRes = await axios({
        method: "get",
        url: "/api/login/" + this.props.account,
      });

      // Sign nonce and public address with private key
      let sign = await ethereum.request({
        method: "personal_sign",
        params: [nonceRes.data.nonce, this.props.account],
        from: this.props.account,
      });

      // Send the signature
      let res = await axios({
        method: "post",
        url: "/api/login",
        data: {
          publicAddress: this.props.account,
          signature: sign,
        },
      });

      // If signature valid set user details to state
      if (res.status == 200) {
        this.setState({ loggedIn: true });
        this.props.setUser(res.data);
      }
    } catch (err) {
      this.setState({ loggedIn: false });
      this.props.setError(
        err.response !== undefined ? err.response.data.error : err
      );
    }
  }

  async componentDidMount() {
    try {
      let res = await axios({
        method: "get",
        url: "/api/myself",
      });
      this.setState({ loggedIn: true });
      this.props.setUser(res.data);
    } catch (err) {
      this.props.setError({
        name: "Unauthorized",
        message: "Please login to continue",
      });
    }
  }

  render() {
    return (
      <main style={{ margin: 20 }}>
        <div>
          {this.state.loggedIn ? (
            <AnswerSheetUploader />
          ) : (
            <button
              className="blue-btn"
              disabled={this.state.disableLoginButton}
              onClick={this.login}
            >
              Login
            </button>
          )}
        </div>
      </main>
    );
  }
}

export default Main;
