import React from "react";

// components
import Row from "./ProjectDetailTicketsRow";

// materialui
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const ProjectDetailTicketsList = ({ tickets }) => {
  const rows = tickets.map(({ info, priority, type, status, user, id }) => {
    return {
      info,
      priority,
      type,
      status,
      user,
      id,
      history: [{ date: "2020-01-05" }, { date: "2020-01-02" }],
    };
  });
  return (
    <TableContainer component={Paper} style={{ width: "85%" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Information</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectDetailTicketsList;
