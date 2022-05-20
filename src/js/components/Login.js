import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";

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

  componentDidUpdate(){
      if (this.state.loggedIn) this.props.navigate(this.props.redirectURL || "/dashboard");
  }

  render() {
    return (
      <React.Fragment>
        <main style={{ margin: 20, marginTop: 80 }}>
          <div>
            {!this.state.loggedIn && (
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
      </React.Fragment>
    );
  }
}

function withHook(Component) {
  return function WrappedComponent(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withHook(Main);