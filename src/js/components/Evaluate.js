import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const defaultState = {
  enableUploadBtn: false,
  explicitEnableUploadBtn: true,
  buttonText: "Add exam",
  name: null,
  month: null,
  year: null,
  type: null,
  reviewers: [],
};

class Evaluate extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, defaultState, {
      reviews: { pending: null, reviewed: null },
    });

    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
  }

  async updateReviews() {
    let res = await axios.get("/api/reviews");
    this.setState({ reviews: res.data });
  }
  async componentDidMount() {
    await this.updateReviews();
  }
  handleEvaluate(reviewId) {
    this.props.navigate("/evaluate/" + reviewId);
  }
  preventDefault(e) {
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>Yet to Review</h1>
          <div className="content">
            {!this.state.reviews.pending ? (
              <Loader />
            ) : (
              <React.Fragment>
                {this.state.reviews.pending.length == 0 ? (
                  <div className="translucent">Nothing here</div>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Action</th>
                      </tr>
                      {this.state.reviews.pending.map((elem, key) => {
                        return (
                          <tr key={key}>
                            <td>{elem}</td>
                            <td>
                              <button
                              className="green mini-btn"
                                onClick={async (e) => {
                                  e.target.disabled = "true";
                                  await this.handleEvaluate(elem);
                                  e.target.disabled = undefined;
                                }}
                              >
                                Evaluate
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            )}
          </div>
        </section>

        <section>
          <h1>Reviewed</h1>
          <div className="content">
            {!this.state.reviews.reviewed ? (
              <Loader />
            ) : (
              <React.Fragment>
                {this.state.reviews.reviewed.length == 0 ? (
                  <div className="translucent">Nothing here</div>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Marks</th>
                      </tr>
                      {this.state.reviews.reviewed &&
                        this.state.reviews.reviewed.map((elem, key) => {
                          return (
                            <tr key={key}>
                              <td>{elem.id}</td>
                              <td>
                                {elem.marks.reduce((total, mark) => {
                                  total += mark;
                                  return total;
                                }, 0)}
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
                )}
              </React.Fragment>
            )}
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

export default withHook(Evaluate);
