import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const StatusGraph = () => {
  const data = useSelector(({ tickets }) => {
    const categorized = {
      IN_PROGRESS: 0,
      OPEN: 0,
      RESOLVED: 0,
    };

    for (const { status } of tickets) {
      categorized[status]++;
    }

    const data = [
      {
        Status: "Open",
        Count: categorized.OPEN,
      },
      {
        Status: "In Progress",
        Count: categorized.IN_PROGRESS,
      },
      {
        Status: "Resolved",
        Count: categorized.RESOLVED,
      },
    ];

    return data;
  });

  return (
    <ResponsiveBar
      data={data}
      keys={["Count"]}
      indexBy="Status"
      layout="horizontal"
      margin={{ top: 30, right: 30, bottom: 60, left: 80 }}
      padding={0.3}
      colorBy="index"
      valueScale={{ type: "linear" }}
      colors={{ scheme: "purple_orange" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
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

export default StatusGraph;
