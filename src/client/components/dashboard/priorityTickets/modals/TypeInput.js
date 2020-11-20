import React from "react";

// materialui
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const TypeInput = ({ type, handleTypeChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup
        aria-label="type"
        name="type1"
        value={type}
        onChange={handleTypeChange}
      >
        <FormControlLabel value="BUG" control={<Radio />} label="Bug" />
        <FormControlLabel value="ERROR" control={<Radio />} label="Error" />
        <FormControlLabel
          value="FEATURE_REQUEST"
          control={<Radio />}
          label="Feature Request"
        />
        <FormControlLabel value="TODO" control={<Radio />} label="To do" />
      </RadioGroup>
    </FormControl>
  );
};

export default TypeInput;
