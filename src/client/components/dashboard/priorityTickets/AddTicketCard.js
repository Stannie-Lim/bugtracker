import React, { useState } from "react";

// components
import AddPriorityTicketModal from "./modals/AddPriorityTicketModal";

// materialui
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

const AddTicketCard = ({ priority }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(!modalVisible);

  return (
    <div>
      <div className="priority-ticket-card add-ticket-card" onClick={openModal}>
        <AddIcon />
      </div>
      <AddPriorityTicketModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        priority={priority}
      />
    </div>
  );
};

export default AddTicketCard;
