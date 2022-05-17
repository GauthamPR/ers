import axios from "axios";
import React, { Component } from "react";

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

class ManageExams extends Component {
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
    this.updateExams();
  }
  componentDidUpdate() {
    if (
      this.state.name &&
      this.state.name.length != 0 &&
      this.state.month &&
      this.state.month.length != 0 &&
      this.state.year != 0 &&
      this.state.type &&
      !this.state.enableUploadBtn
    ) {
      this.setState({ enableUploadBtn: true });
    }
  }
  async handleDelete(examId) {
    await axios({
      method: "delete",
      url: "/api/exams/" + examId,
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
      buttonText: "Adding exam...",
      explicitEnableUploadBtn: false,
    });

    let res = await axios({
      method: "put",
      url: "/api/exams",
      data: this.state,
    });

    this.setState({
      buttonText: "Added exam",
    });

    this.updateExams();
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>Exams</h1>
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Month</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
              {this.state.exams.map((elem, key) => {
                return (
                  <tr key={key}>
                    <td>{elem._id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.type}</td>
                    <td>{elem.month}</td>
                    <td>{elem.year}</td>
                    <td>
                      <button
                        onClick={async (e) => {
                          e.target.disabled = "true";
                          await this.handleDelete(elem._id);
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

        <h1>Add Exams</h1>
        <form className="form" onSubmit={this.preventDefault}>
          <label>
            Enter exam name
            <input
              type="text"
              name="name"
              value={this.state.name || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Enter exam month
            <input
              type="text"
              name="month"
              value={this.state.month || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Enter exam year
            <input
              type="number"
              name="year"
              value={this.state.year || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Select exam type
            <select
              name="type"
              value={this.state.type || undefined}
              onChange={this.handleChange}
            >
              <option selected disabled hidden>
                Select an option
              </option>
              <option value="R">R</option>
              <option value="S">S</option>
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

export default ManageExams;
