import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.js`;

class Evaluator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableUploadBtn: true,
      explicitEnableUploadBtn: true,
      buttonText: "Upload Marks",
      noOfPages: 0,
    };

    this.setPages = this.setPages.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    this.setState({ enableUploadBtn: false, buttonText: "Uploading Marks..." });
    let marks = Array.from(document.getElementsByClassName("mark-input")).map(
      (elem) => Number(elem.value)
    );
    await axios({
      method: "put",
      url: "/api/reviews/" + this.props.answerSheetId,
      data: { marks },
    });
    this.setState({buttonText: "Upload Successful"});
  }

  setPages({ numPages: noOfPages }) {
    this.setState({ noOfPages });
  }
  render() {
    return (
      <React.Fragment>
        {this.props.user && (
          <section>
            <h1>Evaluator</h1>
            <div style={{ display: "flex" }}>
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
                  file={"/api/files/"+this.props.answerSheetId}
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
              <div
                style={{ display: "grid", placeItems: "center", width: "30%" }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  }}
                >
                  {Array.from(new Array(20), (elem, idx) => (
                    <div
                      key={idx}
                      style={{
                        margin: 10,
                        display: "grid",
                        gridTemplateColumns: "25px 40px",
                      }}
                    >
                      {idx + 1}
                      <input
                        className="mark-input"
                        type="text"
                        defaultValue="0"
                        onFocus={(e) => {
                          if (e.target.value == "0") e.target.value = "";
                        }}
                        style={{ textAlign: "center" }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    className="blue-btn"
                    disabled={!this.state.enableUploadBtn}
                    onClick={this.handleClick}
                  >
                    {this.state.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
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

export default withHook(Evaluator);
