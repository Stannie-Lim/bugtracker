const sortByPriority = (tickets) => {
  return tickets
    .map((ticket) => {
      switch (ticket.priority) {
        case "NONE":
          return { ...ticket, priority: 0 };
        case "LOW":
          return { ...ticket, priority: 1 };
        case "MEDIUM":
          return { ...ticket, priority: 2 };
        case "HIGH":
          return { ...ticket, priority: 3 };
      }
    })
    .sort((a, b) => b.priority - a.priority)
    .map((ticket) => {
      switch (ticket.priority) {
        case 0:
          return { ...ticket, priority: "NONE" };
        case 1:
          return { ...ticket, priority: "LOW" };
        case 2:
          return { ...ticket, priority: "MEDIUM" };
        case 3:
          return { ...ticket, priority: "HIGH" };
      }
    });
};

export default sortByPriority;
