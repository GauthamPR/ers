import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "rgb(38, 43, 50)",
  width: "100%",
  zIndex: "1000",
  boxSizing: "border-box",
  position: "fixed",
  height: "50px",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  borderBottom: "1px solid black",
  boxShadow: "0px 1px 8px #0006",
};

const navUlStyle = {
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
  listStyle: "none",
  padding: "0",
  margin: "0",
};

const navUlLi = {
  flexGrow: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px 22px",
  cursor: "pointer",
};
const navUlLiA = {
  textDecoration: "none",
  letterSpacing: "1px",
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
        name: "Upload Answer Sheet",
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
      {
        name: "Manage Reviewers",
        url: "manage-reviewers",
        permissions: ["add_reviewers", "remove_reviewers"],
        display: false,
      },
      {
        name: "Evaluate",
        url: "evaluate",
        permissions: ["evaluate"],
        display: false,
      },
    ];

    navs = navs.map((elem) => {
      elem.permissions.forEach((perm) => {
        if (this.props.user.permissions.indexOf(perm) != -1) {
          elem.display = true;
        }
      });
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
                      <li className="hover-anim" key={e.url} style={navUlLi}>
                        <Link style={navUlLiA} to={e.url}>
                          {e.name}
                        </Link>
                      </li>
                    )
                  );
                })}
            </ul>
            <a
              className="hover-red"
              style={{
                height: "100%",
                padding: "0px 22px",
                backgroundColor: "black",
                textDecoration: "none",
                display: "grid",
                placeItems: "center",
                letterSpacing: "1px",
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
