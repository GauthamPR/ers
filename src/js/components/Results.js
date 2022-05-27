import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const defaultState = {
  enableUploadBtn: false,
  explicitEnableUploadBtn: true,
  buttonText: "Search",
  rollNo: null,
};

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, defaultState, { exams: [] });

    this.handleChange = this.handleChange.bind(this);
    this.handleView = this.handleView.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
  }

  componentDidUpdate() {
    if (
      this.state.rollNo &&
      this.state.rollNo.length != 0 &&
      !this.state.enableUploadBtn
    ) {
      this.setState({ enableUploadBtn: true });
    }
  }

  preventDefault(e) {
    e.preventDefault();
  }

  handleView(reviewId) {
    this.props.navigate("/public/results/" + reviewId);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }
  submitInfo = async () => {
    this.setState({
      buttonText: "Searching...",
      explicitEnableUploadBtn: false,
    });

    let res = await axios({
      method: "get",
      url: "/api/answer-sheets/" + this.state.rollNo,
    });

    console.log(res.data);
    this.setState({
      buttonText: "Search",
      enableUploadBtn: true,
      explicitEnableUploadBtn: true,
      answerSheets: res.data.answerSheets,
    });
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: 20,
            }}
          >
            <label style={{ display: "flex", flexDirection: "column" }}>
              Enter Roll No
              <input
                type="text"
                name="rollNo"
                value={this.state.rollNo || ""}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <button
                className="blue-btn"
                disabled={
                  !(
                    this.state.enableUploadBtn &&
                    this.state.explicitEnableUploadBtn
                  )
                }
                onClick={this.submitInfo}
                type="submit"
              >
                {this.state.buttonText}
              </button>
            </label>
          </div>
        </section>

        <section>
          <h1>Answer Sheets</h1>
          <div className="content">
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Marks</th>
                  <th>Action</th>
                </tr>
                {this.state.answerSheets &&
                  this.state.answerSheets.map((elem, key) => {
                    return (
                      <tr key={key}>
                        <td>{elem.id}</td>
                        <td>
                          {elem.marks.length > 0 ? (
                            elem.marks.reduce((total, mark) => {
                              total += mark;
                              return total;
                            }, 0)
                          ) : (
                            <i style={{ color: "gray" }}>Not yet reviewed</i>
                          )}
                        </td>
                        <td>
                          <button
                            className="green mini-btn"
                            onClick={async (e) => {
                              e.target.disabled = "true";
                              await this.handleView(elem.id);
                              e.target.disabled = undefined;
                            }}
                          >
                            View
                          </button>
                        </td>
                        {/* <td>
                      <button
                        onClick={async (e) => {
                          e.target.disabled = "true";
                          await this.handleEvaluate(elem._id);
                          e.target.disabled = undefined;
                        }}
                      >
                        Delete
                      </button>
                    </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
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

export default withHook(Results);
