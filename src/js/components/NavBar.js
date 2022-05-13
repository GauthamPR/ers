import React from "react";

const navStyle = {
  backgroundColor: "silver",
  width: "100%",
  zIndex: "1000",
  boxSizing: "border-box",
  position: "fixed",
  height: "40px",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
};

const navUlStyle = {
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
  listStyle: "none",
  padding: "0",
  margin: "0",
  borderBottom: "1px solid black",
  borderLeft: "1px solid black",
};

const navUlLi = {
  flexGrow: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px 10px",
  backgroundColor: "whitesmoke",
  border: "1px solid transparent",
};
const navUlLiA = {
  color: "black",
  textDecoration: "none",
  fontFamily: "Courier New, Courier, monospace",
  height: "100%",
  width: "100%",
  display: "grid",
  placeItems: "center",
};

// const navUlLi:hover{
//     background-color: #F5BA42;
//     border-right: 1px solid black;
//     border-left: 1px solid black;
// }
// nav ul li:first-child:hover{
//     border-left: 1px solid transparent;
// }

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // setTimeout(()=>{this.props.setError(null)}, 5000);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user && (
          <nav style={navStyle}>
            <ul style={navUlStyle}>
              {this.props.user &&
                this.props.user.permissions.map((e) => {
                  return (
                    <li key={e} style={navUlLi}>
                      <a style={navUlLiA}>{e}</a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
