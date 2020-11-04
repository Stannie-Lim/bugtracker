import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { createTicket } from "../../store/store";

const AddTicket = ({ match, history }) => {
  const types = ["Bug", "Error", "Feature Request", "To-Do"];
  const priorities = ["None", "Low", "Medium", "High"];

  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("");

  const addTicket = (ev) => {
    ev.preventDefault();

    const hasError = checkError();
    if (hasError) return;

    makeTicket();
  };

  const checkError = () => {
    setError("");
    if (type === "") {
      setError("Please select a type from the dropdown menu");
      return true;
    } else if (priority === "") {
      setError("Please select a priority from the dropdown menu");
      return true;
    }
    return false;
  };

  const dispatch = useDispatch();
  const makeTicket = () => {
    const { projectId } = match.params;
    dispatch(createTicket(info, type, priority, projectId));
    history.push(`/projects/${projectId}`);
  };

  return (
    <div className="main">
      <h1>{error}</h1>
      <form onSubmit={addTicket}>
        <select onChange={({ target }) => setType(target.value)}>
          <option defaultValue hidden>
            Type
          </option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select onChange={({ target }) => setPriority(target.value)}>
          <option defaultValue hidden>
            Priority
          </option>
          {priorities.map((priority) => (
            <option key={priority}>{priority}</option>
          ))}
        </select>

        <textarea
          onChange={({ target }) => setInfo(target.value)}
          value={info}
          required
        />

        <button>Create a new ticket</button>
      </form>
    </div>
  );
};

export default AddTicket;
