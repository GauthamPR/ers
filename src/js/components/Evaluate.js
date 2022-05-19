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
      reviews: { pending: [], reviewed: [] },
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
          {this.state.reviews.pending.length == 0 ? (
            <Loader />
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                </tr>
                {this.state.reviews.pending.map((elem, key) => {
                  return (
                    <tr key={key}>
                      <td>{elem}</td>
                      <td>
                        <button
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
        </section>

        <section>
          <h1>Reviewed</h1>
          <table>
            <tbody>
              <tr>
                <th>Id</th>
              </tr>
              {this.state.reviews.reviewed.map((elem, key) => {
                return (
                  <tr key={key}>
                    <td>{elem}</td>
                    <td>
                      <button
                        onClick={async (e) => {
                          e.target.disabled = "true";
                          await this.handleEvaluate(elem._id);
                          e.target.disabled = undefined;
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
