import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js`;

class IndivResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableUploadBtn: true,
      explicitEnableUploadBtn: true,
      buttonText: "Apply for Revaluation",
      noOfPages: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setPages = this.setPages.bind(this);
  }

  async handleClick() {
    this.setState({ enableUploadBtn: false, buttonText: "Applying..." });

    try {
      await axios({
        method: "put",
        url: "/api/answer-sheets/" + this.props.answerSheetId + "/revaluate",
        data: { password: "studentPass" },
      });
      this.setState({ buttonText: "Applied for Revaluation" });
    } catch (err) {
      let errMsg = err.response.data.error;
      if (errMsg == "MAX_REVAL")
        this.setState({ buttonText: "Already Re-evaluated" });
      else if (errMsg == "REVAL_ONGOING")
        this.setState({ buttonText: "Ongoing Revaluation" });
      else this.setState({ buttonText: err.msg || "Unavailable" });
    }
  }

  async updateResults() {
    let res = await axios.get("/api/results/" + this.props.answerSheetId);
    this.setState({ result: res.data.result });
    if (this.state.result.state == "REVAL_ONGOING") {
      this.setState({
        enableUploadBtn: false,
        buttonText: "Revaluation Pending",
      });
    } else if (this.state.result.state == "MAX_REVAL") {
      this.setState({
        enableUploadBtn: false,
        buttonText: "Already Revaluated",
      });
    } else if (
      !this.state.result.marks ||
      this.state.result.marks.length == 0
    ) {
      this.setState({
        enableUploadBtn: false,
        buttonText: "Results Pending",
      });
    }
  }

  async componentDidMount() {
    await this.updateResults();
  }

  setPages({ numPages: noOfPages }) {
    this.setState({ noOfPages });
  }
  render() {
    return (
      <React.Fragment>
        <section>
          {this.state.result && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <button
                className="green-btn"
                disabled={!this.state.enableUploadBtn}
                onClick={this.handleClick}
              >
                {this.state.buttonText}
              </button>
            </div>
          )}
          <h1>Result</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                overflow: "scroll",
                height: "75vh",
                width: "70%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Document
                onLoadSuccess={this.setPages}
                onLoadError={console.error}
                file={"/api/files/" + this.props.answerSheetId}
                options={{
                  cMapUrl: "cmaps/",
                  cMapPacked: true,
                  standardFontDataUrl: "standard_fonts/",
                }}
              >
                {Array.from(new Array(this.state.noOfPages), (el, index) => (
                  <Page
                    scale={1.7}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>
            </div>
            {this.state.result && this.state.result.marks.length > 0 && (
              <div
                style={{ display: "grid", placeItems: "center", width: "30%" }}
              >
                <div
                  style={{
                    width: "95%",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    columnGap: 10,
                  }}
                >
                  {[
                    this.state.result.marks.slice(0, 10),
                    this.state.result.marks.slice(10, 20),
                  ].map((set, tableIdx) => {
                    return (
                      <table key={tableIdx}>
                        <tbody>
                          <tr>
                            <th>Question Number</th>
                            <th>Marks</th>
                          </tr>
                          {set.map((elem, key) => {
                            return (
                              <tr key={key}>
                                <td>{tableIdx * 10 + key + 1}</td>
                                <td>{elem}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function withHook(Component) {
  return function WrappedComponent(props) {
    let params = useParams();
    return <Component {...props} answerSheetId={params.answerSheetId} />;
  };
}

export default withHook(IndivResult);
