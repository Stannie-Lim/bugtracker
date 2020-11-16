import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/common";
import { useSelector, useDispatch } from "react-redux";

// components
import TicketRow from "./TicketRow";

// materialui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";

const YourTickets = () => {
  const user = useSelector(({ user }) => user);
  const tickets = useSelector(({ tickets }) =>
    tickets.filter((ticket) => ticket.userId === user.id)
  );

  const rows = tickets.map(
    ({ info, project, priority, type, status, user, id, tickethistories }) => {
      const history = tickethistories.map(
        ({ createdAt, priority, status, user }) => {
          return {
            id: createdAt,
            date: moment(createdAt).format("llll"),
            priority: capitalize(priority),
            status: capitalize(status),
            modified_by: user.fullName,
          };
        }
      );
      return {
        info,
        priority: capitalize(priority),
        type: capitalize(type),
        project,
        status: capitalize(status),
        user,
        id,
        history,
      };
    }
  );

  const classes = useStyles();
  return (
    <div className="main">
      <Link to="/home">Back</Link>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <Typography variant="h2" gutterBottom>
                    Your Tickets
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell />
                <TableCell>Information</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Project</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
              <TableRow>
                <TableCell rowSpan={2} />
                <TableCell rowSpan={2} />
                <TableCell rowSpan={2} />
                <TableCell rowSpan={2} />
                <TableCell rowSpan={2} />
                <TableCell>Your Ticket Count</TableCell>
                <TableCell align="right">{tickets.length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Your Resolved Tickets</TableCell>
                <TableCell align="right">{user.resolvedTickets}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default YourTickets;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
