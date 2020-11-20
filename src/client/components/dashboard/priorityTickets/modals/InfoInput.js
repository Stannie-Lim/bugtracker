import React from "react";

// materialui
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const InfoInput = ({ info, handleInfoChange }) => {
  return (
    <FormControl>
      <TextField
        id="outlined-basic-2"
        label="Information"
        type="text"
        variant="outlined"
        margin="dense"
        required
        value={info}
        onChange={handleInfoChange}
      />
    </FormControl>
  );
};

export default InfoInput;
