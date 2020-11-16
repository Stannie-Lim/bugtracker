import { useSelector, useDispatch } from "react-redux";
import React, { useState, Fragment } from "react";

// store
import { unassignTicket, resolveTicket } from "../../../store/store";

// materialui
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const TicketRow = ({ ticket }) => {
  const [open, setOpen] = useState(false);

  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const unassignYourself = (ticketId) => {
    dispatch(unassignTicket(user.id, ticketId));
  };

  const resolve = (ticketId) => {
    dispatch(resolveTicket(user.id, ticketId));
  };

  return (
    <Fragment>
      <TableRow key={ticket.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{ticket.info}</TableCell>
        <TableCell align="right">{ticket.priority}</TableCell>
        <TableCell align="right">{ticket.type}</TableCell>
        <TableCell align="right">{ticket.status}</TableCell>
        <TableCell align="right">{ticket.project.title}</TableCell>
        <TableCell align="right">
          <div>
            <button onClick={() => unassignYourself(ticket.id)}>
              Unassign yourself
            </button>
            <button onClick={() => resolve(ticket.id)}>Resolve ticket</button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Modified by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ticket.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.priority}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.status}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.modified_by}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default TicketRow;
