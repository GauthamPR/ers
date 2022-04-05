import React from "react";

const NOT_CONNECTED = "NOT_CONNECTED";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { status: NOT_CONNECTED, disableButton: false };

    this.connectToMetaMask = this.connectToMetaMask.bind(this);
  }

  async connectToMetaMask() {
    this.setState({
      disableButton: true,
    });
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      this.props.setAccount(accounts[0]);
      this.setState({
          disableButton: false
      });
  }

  render() {
    return (
      <main style={{ margin: 20 }}>
        {/* {this.props.content.empty ?
                    <div className="empty-placeholder">Empty Folder</div>
                 :
                 <React.Fragment>
                    <DirectoryContainer openDirectory={this.props.openDirectory} directories={this.props.content.directories}/>
                    <ImageContainer path={this.props.path} images={this.props.content.images} />
                </React.Fragment>
                } */}
        <button
          disabled={this.state.disableButton}
          onClick={this.connectToMetaMask}
        >
          Connect
        </button>
      </main>
    );
  }
}

export default Main;
