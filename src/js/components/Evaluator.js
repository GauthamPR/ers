import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";

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

class Evaluator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <h1>Evaluator</h1>
          {console.log(this.props)}
          <h1>{this.props.answerSheetId}</h1>
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

export default withHook(Evaluator);