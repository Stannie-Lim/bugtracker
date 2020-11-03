import React, { useState } from "react";
import { useDispatch } from "react-redux";

// store
import { createProject } from "../../store/store";

const AddProject = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const addProject = (ev) => {
    ev.preventDefault();
    dispatch(createProject(title, description));
    history.push("/projects");
  };

  return (
    <div className="main">
      <form onSubmit={addProject}>
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
          placeholder="Project Title "
          required
        />
        <input
          type="text"
          onChange={({ target }) => setDescription(target.value)}
          value={description}
          placeholder="Project Description "
          required
        />
        <button>Create a new project</button>
      </form>
    </div>
  );
};

export default AddProject;
