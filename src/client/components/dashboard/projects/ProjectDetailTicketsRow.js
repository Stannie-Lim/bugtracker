import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import {
  assignTicket,
  unassignTicket,
  resolveTicket,
} from "../../../store/store";

// css
import "./ProjectDetailTicketsRow.css";

// materialui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const ProjectDetailTicketsRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const ticketUser = row.user;
  const userId = useSelector(({ user }) => user.id);

  const dispatch = useDispatch();
  const assignYourself = () => {
    dispatch(assignTicket(userId, row.id));
  };

  const unassignYourself = () => {
    dispatch(unassignTicket(userId, row.id));
  };

  const resolve = () => {
    dispatch(resolveTicket(userId, row.id));
  };

  const capitalize = (str) => {
    str = str.split("-").join(" ").split("_").join(" ");
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  };

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.info}</TableCell>
        <TableCell align="right">{capitalize(row.priority)}</TableCell>
        <TableCell align="right">{capitalize(row.type)}</TableCell>
        <TableCell align="right">{capitalize(row.status)}</TableCell>
        <TableCell align="right">
          {row.status === "RESOLVED" ? (
            "Resolved"
          ) : !ticketUser ? (
            <div className="assign-buttons">
              <button onClick={assignYourself}>Assign yourself</button>
            </div>
          ) : userId === ticketUser.id ? (
            <div className="assign-buttons">
              <button onClick={unassignYourself}>Unassign yourself</button>
              <button onClick={resolve}>Resolve ticket</button>
            </div>
          ) : (
            <div className="assign-buttons">
              Assigned to {ticketUser.fullName}
            </div>
          )}
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
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
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

export default ProjectDetailTicketsRow;
