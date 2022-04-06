import axios from "axios";
import React, { Component } from "react";

class AnswerSheetUploader extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    studentRollNo: "",
    selectedExamId: "",
    exams: [],
    enableUploadBtn: false,
  };

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
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

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
    axios.put("api/answerSheet", formData);
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
    let res = await axios.get("/api/exams");
    this.setState({ exams: res.data.exams });
  }

  render() {
    return (
      <div>
        <h1>Upload answer sheets</h1>
        <div>
          <label>
            Answer Sheet
            <input type="file" onChange={this.onFileChange} />
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
          <button
            disabled={!this.state.enableUploadBtn}
            onClick={this.onFileUpload}
          >
            Upload
          </button>
        </div>
        {/* {this.fileData()} */}
      </div>
    );
  }
}

export default AnswerSheetUploader;
