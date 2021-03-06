import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const YourGraph = () => {
  const user = useSelector(({ user }) => user);
  const data = useSelector(({ tickets }) => {
    const _tickets = tickets.filter((ticket) => ticket.userId === user.id);
    const categorized = {
      NONE: 0,
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
    };

    for (const { priority } of _tickets) {
      categorized[priority]++;
    }

    const data = [
      {
        Priority: "None",
        Count: categorized.NONE,
      },
      {
        Priority: "Low",
        Count: categorized.LOW,
      },
      {
        Priority: "Medium",
        Count: categorized.MEDIUM,
      },
      {
        Priority: "High",
        Count: categorized.HIGH,
      },
    ];

    return data;
  });

  return (
    <ResponsiveBar
      data={data}
      keys={["Count"]}
      indexBy="Priority"
      margin={{ top: 30, right: 30, bottom: 60, left: 30 }}
      padding={0.3}
      colorBy="index"
      valueScale={{ type: "linear" }}
      colors={{ scheme: "paired" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Priority",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default YourGraph;
