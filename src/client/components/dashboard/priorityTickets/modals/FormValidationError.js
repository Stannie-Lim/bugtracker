import React from "react";

// materialui
import Alert from "@material-ui/lab/Alert";

const FormValidationError = ({ error }) => {
  return error.length ? (
    <Alert variant="filled" severity="error">
      Please fill out all required fields!
    </Alert>
  ) : (
    ""
  );
};

export default FormValidationError;
