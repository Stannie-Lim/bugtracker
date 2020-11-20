import React from "react";

// components
import TypeInput from "./TypeInput";
import InfoInput from "./InfoInput";
import ProjectInput from "./ProjectInput";

// bootstrap
import Modal from "react-bootstrap/Modal";

const ModalBody = ({
  handleTypeChange,
  handleProjectChange,
  handleInfoChange,
  type,
  projectId,
  info,
}) => {
  return (
    <Modal.Body>
      <TypeInput type={type} handleTypeChange={handleTypeChange} />
      <ProjectInput
        projectId={projectId}
        handleProjectChange={handleProjectChange}
      />
      <InfoInput info={info} handleInfoChange={handleInfoChange} />
    </Modal.Body>
  );
};

export default ModalBody;
