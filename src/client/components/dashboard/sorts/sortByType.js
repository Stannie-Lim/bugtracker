const sortByType = (tickets) => {
  return tickets
    .map((ticket) => {
      switch (ticket.type) {
        case "FEATURE_REQUEST":
          return { ...ticket, type: 0 };
        case "TO-DO":
          return { ...ticket, type: 1 };
        case "ERROR":
          return { ...ticket, type: 2 };
        case "BUG":
          return { ...ticket, type: 3 };
      }
    })
    .sort((a, b) => a.type - b.type)
    .map((ticket) => {
      switch (ticket.type) {
        case 0:
          return { ...ticket, type: "FEATURE_REQUEST" };
        case 1:
          return { ...ticket, type: "TO-DO" };
        case 2:
          return { ...ticket, type: "ERROR" };
        case 3:
          return { ...ticket, type: "BUG" };
      }
    });
};

export default sortByType;
