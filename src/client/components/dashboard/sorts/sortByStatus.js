const sortByStatus = (tickets) => {
  return tickets
    .map((ticket) => {
      switch (ticket.status) {
        case "RESOLVED":
          return { ...ticket, status: 0 };
        case "IN_PROGRESS":
          return { ...ticket, status: 1 };
        case "OPEN":
          return { ...ticket, status: 2 };
      }
    })
    .sort((a, b) => b.status - a.status)
    .map((ticket) => {
      switch (ticket.status) {
        case 0:
          return { ...ticket, status: "RESOLVED" };
        case 1:
          return { ...ticket, status: "IN_PROGRESS" };
        case 2:
          return { ...ticket, status: "OPEN" };
      }
    });
};

export default sortByStatus;
