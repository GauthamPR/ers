import axios from "axios";
import React, { Component } from "react";

const defaultState = {
  enableUploadBtn: false,
  explicitEnableUploadBtn: true,
  buttonText: "Add reviewer",
  publicAddress: null,
  examId: null,
};

class ManageReviewers extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, defaultState, { exams: [] });

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
  }

  async updateExams() {
    let res = await axios.get("/api/exams");
    this.setState({ exams: res.data.exams });
  }
  async componentDidMount() {
    await this.updateExams();
  }
  componentDidUpdate() {
    if (
      this.state.examId &&
      this.state.examId.length != 0 &&
      this.state.publicAddress &&
      !this.state.enableUploadBtn
    ) {
      this.setState({ enableUploadBtn: true });
    }
  }
  async handleDelete(examId, reviewer) {
    await axios({
      method: "delete",
      url: "/api/exams/" + examId + "/reviewers/" + reviewer,
    });
    this.updateExams();
  }
  preventDefault(e) {
    e.preventDefault();
  }
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }
  submitInfo = async () => {
    this.setState({
      buttonText: "Adding reviewer...",
      explicitEnableUploadBtn: false,
    });

    let res = await axios({
      method: "put",
      url: "/api/exams/" + this.state.examId + "/reviewers",
      data: { publicAddress: this.state.publicAddress },
    });

    this.setState({
      buttonText: "Added reviewer",
    });

    this.updateExams();
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>Reviewers</h1>
          <table>
            <tbody>
              <tr>
                <th>Reviewer PA</th>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Month</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
              {this.state.exams.map((exam, key) => {
                return exam.reviewers.map((reviewer, key) => {
                  return (
                    <tr key={key}>
                      <td>{reviewer}</td>
                      <td>{exam._id}</td>
                      <td>{exam.name}</td>
                      <td>{exam.type}</td>
                      <td>{exam.month}</td>
                      <td>{exam.year}</td>
                      <td>
                        <button
                          onClick={async (e) => {
                            e.target.disabled = "true";
                            await this.handleDelete(exam._id, reviewer);
                            e.target.disabled = undefined;
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </section>

        <h1>Add Reviewers</h1>
        <form className="form" onSubmit={this.preventDefault}>
          <label>
            Enter Reviewer Public Address
            <input
              type="text"
              name="publicAddress"
              value={this.state.publicAddress || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Choose exam
            <select name="examId" onChange={this.handleChange}>
              <option value="">None</option>
              {this.state.exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.name +
                    "-" +
                    exam.month +
                    " " +
                    exam.year +
                    "(" +
                    exam.type +
                    ")"}
                </option>
              ))}
            </select>
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
            <button
              className="blue-btn"
              onClick={() => {
                this.setState(defaultState);
              }}
            >
              Reset
            </button>
          </label>
        </form>
      </React.Fragment>
    );
  }
}

export default ManageReviewers;
