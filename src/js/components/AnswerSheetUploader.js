import axios from "axios";
import React, { Component } from "react";

let defaultState = {
  selectedFile: null,
  studentRollNo: "",
  selectedExamId: "",
  exams: [],
  enableUploadBtn: false,
  buttonText: "Upload",
};

class AnswerSheetUploader extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  attemptEnableUploadBtn = () => {
    if (
      this.state.selectedFile &&
      this.state.studentRollNo.length != 0 &&
      this.state.selectedExamId.length != 0
    ) {
      this.setState({ enableUploadBtn: true });
    }
  };

  onStudentRollNoChange = (event) => {
    this.setState({ studentRollNo: event.target.value });
    this.attemptEnableUploadBtn();
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    this.attemptEnableUploadBtn();
  };

  onExamChange = (event) => {
    this.setState({ selectedExamId: event.target.value });
    this.attemptEnableUploadBtn();
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();
    this.setState({
      buttonText: "Uploading....",
      enableUploadBtn: false,
    });

    // Update the formData object
    formData.append(
      "answerSheet",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Update the formData object
    formData.append("studentRollNo", this.state.studentRollNo);

    // Update the formData object
    formData.append("examId", this.state.selectedExamId);

    // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    let res = await axios.put("api/answerSheet", formData);
    this.setState({
      buttonText: "Upload successful",
    });
  };

  // File content to be displayed after
  // file upload is complete
  // fileData = () => {
  //   if (this.state.selectedFile) {
  //     return (
  //       <div>
  //         <h2>File Details:</h2>

  //         <p>File Name: {this.state.selectedFile.name}</p>

  //         <p>File Type: {this.state.selectedFile.type}</p>

  //         {/* <p>
  //           Last Modified:{" "}
  //           {this.state.selectedFile.lastModifiedDate.toDateString()}
  //         </p> */}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <br />
  //         <h4>Choose Answer sheet before Pressing the Upload button</h4>
  //       </div>
  //     );
  //   }
  // };

  async componentDidMount() {
    if (this.props.user) {
      let res = await axios.get("/api/exams");
      this.setState({ exams: res.data.exams });
      defaultState.exams = res.data.exams;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user &&
          this.props.user.permissions.indexOf("answer_sheet_upload") != -1 && (
            <div>
              <h1>Upload answer sheets</h1>
              <div className="form">
                <label>
                  Answer Sheet
                  <input
                    id="ans-upload"
                    type="file"
                    onChange={this.onFileChange}
                  />
                </label>
                <label>
                  Exam
                  <select onChange={this.onExamChange}>
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
                  Student Roll No
                  <input
                    type="text"
                    onChange={this.onStudentRollNoChange}
                    value={this.state.studentRollNo}
                  />
                </label>
              </div>
              <div className="btn-holder">
                <label>
                  <label>
                    <button
                      className="blue-btn"
                      disabled={!this.state.enableUploadBtn}
                      onClick={this.onFileUpload}
                    >
                      {this.state.buttonText}
                    </button>
                  </label>
                  <button
                    className="orange-btn"
                    onClick={() => {
                      document.getElementById("ans-upload").value = "";
                      this.setState(defaultState);
                    }}
                  >
                    Reset
                  </button>
                </label>
              </div>
              {/* {this.fileData()} */}
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default AnswerSheetUploader;
