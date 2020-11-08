import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";

const TypeGraph = () => {
  const data = useSelector(({ tickets }) => {
    const categorized = {
      ERROR: 0,
      BUG: 0,
      "TO-DO": 0,
      FEATURE_REQUEST: 0,
    };

    for (const { type } of tickets) {
      categorized[type]++;
    }

    const data = [
      {
        id: "Error",
        label: "Error",
        value: categorized.ERROR,
      },
      {
        id: "BUG",
        label: "Bug",
        value: categorized.BUG,
      },
      {
        id: "To do",
        label: "To do",
        value: categorized["TO-DO"],
      },
      {
        id: "Feature Request",
        label: "Feature Request",
        value: categorized.FEATURE_REQUEST,
      },
    ];

    return data;
  });

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "pink_yellowGreen" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TypeGraph;
