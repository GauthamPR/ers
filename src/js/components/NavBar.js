import React from "react";
import { Link } from "react-router-dom";

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

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    let navs = [
      {
        name: "Upload answer sheet",
        url: "answer-sheet",
        permissions: ["answer_sheet_upload"],
        display: false,
      },
      {
        name: "Manage Exams",
        url: "manage-exams",
        permissions: ["add_exams", "remove_exams"],
        display: false,
      },
    ];

    navs = navs.map((elem) => {
      console.log(this.props.user)
      elem.permissions.forEach((perm)=>{
        if (this.props.user.permissions.indexOf(perm) != -1) {
          elem.display = true;
        }
      })
      return elem;
    });

    this.state = {
      navs,
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user && (
          <nav style={navStyle}>
            <ul style={navUlStyle}>
              {this.props.user &&
                this.state.navs &&
                this.state.navs.map((e) => {
                  return (
                    e.display && (
                      <li key={e.url} style={navUlLi}>
                        <Link style={navUlLiA} to={e.url}>
                          {e.name}
                        </Link>
                      </li>
                    )
                  );
                })}
            </ul>
            <a
              style={{
                height: "100%",
                color: "black",
                padding: "0px 10px",
                fontFamily: "Courier New, Courier, monospace",
                backgroundColor: "whitesmoke",
                textDecoration: "none",
                display: "grid",
                placeItems: "center",
              }}
              href="/api/logout"
            >
              Logout
            </a>
          </nav>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
