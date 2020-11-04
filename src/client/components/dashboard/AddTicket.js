import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { createTicket } from "../../store/store";

const AddTicket = ({ match, history }) => {
  const types = ["Bug", "Error", "Feature Request", "To-Do"];
  const priorities = ["None", "Low", "Medium", "High"];

  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");

  const dispatch = useDispatch();
  const addTicket = (ev) => {
    const { projectId } = match.params;
    ev.preventDefault();
    dispatch(createTicket(info, type, priority, projectId));
    history.push(`/projects/${projectId}`);
  };

  return (
    <div className="main">
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
        />

        <button>Create a new ticket</button>
      </form>
    </div>
  );
};

export default AddTicket;
