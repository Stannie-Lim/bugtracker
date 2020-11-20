import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import FormValidationError from "./FormValidationError";

// store
import { createTicket, getProjects } from "../../../../store/store";

// bootstrap
import Modal from "react-bootstrap/Modal";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const AddPriorityTicketModal = ({
  priority,
  modalVisible,
  setModalVisible,
}) => {
  const [info, setInfo] = useState("");
  const [type, setType] = useState("BUG");
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const fillOutFields = () => {
    setError("Fill out all required fields");
    setTimeout(() => setError(""), 6000);
  };

  const getData = () => dispatch(getProjects());

  const handleTypeChange = ({ target }) => setType(target.value);
  const handleProjectChange = ({ target }) => setProjectId(target.value);
  const handleInfoChange = ({ target }) => setInfo(target.value);
  const closeModal = () => setModalVisible(false);

  const submit = () => {
    if (info === "" || projectId === "") {
      fillOutFields();
      return;
    }

    closeModal();
    setInfo("");
    setType("BUG");
    setProjectId("");

    dispatch(
      createTicket(info, type, priority === "no" ? "NONE" : priority, projectId)
    );
  };

  return (
    <Modal show={modalVisible} onHide={closeModal} centered>
      <ModalHeader priority={priority} />
      <FormValidationError error={error} />
      <ModalBody
        handleTypeChange={handleTypeChange}
        handleProjectChange={handleProjectChange}
        handleInfoChange={handleInfoChange}
        type={type}
        info={info}
        projectId={projectId}
      />
      <ModalFooter closeModal={closeModal} submit={submit} />
    </Modal>
  );
};

export default AddPriorityTicketModal;
