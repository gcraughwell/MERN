//SurveyField contains logic to render a single
//label and text imput

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {/* passes the input data to the export */}
        {touched && error}
      </div>
    </div>
  );
};
