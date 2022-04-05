import React from "react";
import Main from "./js/components/main.js"; 

// states
const CLEAN = "CLEAN";
const META_INSTALLED = "META_INSTALLED";

//errors
const META_NOT_FOUND = "META_NOT_FOUND";

function Loading() {
  return <h1>Loading....</h1>;
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
    // this.getDirectoryContents = this.getDirectoryContents.bind(this);
    // if ("serviceWorker" in navigator) {
    //     window.addEventListener("load", function() {
    //       navigator.serviceWorker
    //         .register("/serviceWorker.js")
    //         .catch(err => console.log("Unable to register Service Worker", err))
    //     })
    // }

    // HERE COMES START CODE

    // COULD BE USEFUL
    // ---------------
    // window.onpopstate = function(event){
    //     let newAddress = decodeURI(window.location.pathname);
    //     props.setAddress(newAddress.slice(1, newAddress.length), false);
    // }
  }

  // getDirectoryContents(){
  //     fetch('/getDirectory/' + [...this.props.tree, this.props.currentDirectory].join('/'))
  //     .then(response=>response.json())
  //     .then(data=>{
  //         if(data.error)
  //             this.props.setError(data.error);
  //         else
  //             this.props.loadContent(data);
  //     })
  // }
  // componentDidUpdate(prevProps){
  //     if(prevProps.currentDirectory != this.props.currentDirectory || prevProps.tree != this.props.tree)
  //         this.getDirectoryContents();
  // }
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
        {/* <Navbar 
                    tree={this.props.tree}
                    pushHistory={this.props.pushHistory}
                    currentDirectory={this.props.currentDirectory}
                    goBack={this.props.goBack}
                    setAddress={this.props.setAddress}
                /> */}
        {this.state.status == CLEAN ? (
          <Loading />
        ) : !this.state.err ? (
          <Main setAccount={this.setAccount} />
        ) : (
          <ErrorScreen err={this.state.err} />
        )}
      </div>
    );
  }
}

export default App;
