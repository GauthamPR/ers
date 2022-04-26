import React from "react";

const outerBox = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  top: "25vh",
  width: "100%",
};

const flexContainer = {
  width: "80%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: "16px",
};

const internalFlexContainer = {
  color: "black",
  display: "flex",
  justifyContent: "flex-end",
};

const titleStyle = {
  width: "100%",
  color: "black",
  margin: 0,
  marginTop: "20px",
  wordBreak: "break-all",
};

const msgStyle = {
  color: "red",
  padding: "45px",
};

class ErrorScreen extends React.Component {
  constructor(props) {
    super(props);
  }
 
  componentDidMount() {
    // setTimeout(()=>{this.props.setError(null)}, 5000);
  }

  render() {
    return (
      <div style={outerBox}>
        <div style={flexContainer}>
          <div style={internalFlexContainer}>
            <h1 style={titleStyle}>{this.props.err.name}</h1>
            <button
              style={{ position: "absolute" }}
              onClick={() => this.props.setError(null)} 
            >
              X
            </button>
          </div>
          <hr style={{ width: "100%" }}></hr>
          <div style={msgStyle}>{this.props.err.message}</div>
        </div>
      </div>
    );
  }
}

export default ErrorScreen;