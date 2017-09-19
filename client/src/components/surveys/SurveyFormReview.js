//survey form review shows a user there inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm entries</h5>
      {reviewFields}

      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
        <i className="material-icons right">arrow_back</i>
      </button>

      <button
        //history makes it possible to route after submit
        onClick={() => submitSurvey(formValues, history)}
        className="teal btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return { formValues: state.form.surveyForm.values };
}
//withRouter Makes it able to reroute the action creator
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
