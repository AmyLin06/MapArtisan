import React from "react";
import LegendTile from "../components/LegenTile";
export const choroplethLegend = (upper, lower, colors) => {
  upper = parseFloat(upper);
  lower = parseFloat(lower);

  const step = (upper - lower) / 5;
  const colorList = colors;
  const firstTile = lower == 0 ? lower + 1 : lower;
  const secondTile = firstTile + step;
  const thirdTile = secondTile + step;
  const fourthTile = thirdTile + step;
  const fifthTile = fourthTile + step;

  const legendList = [
    new LegendTile(
      fifthTile + " + ",
      colorList[4],
      (stat) => stat > fifthTile,
      "white"
    ),
    new LegendTile(
      fourthTile + " - " + fifthTile,
      colorList[3],
      (stat) => stat < fifthTile && stat >= fourthTile,
      "white"
    ),
    new LegendTile(
      thirdTile + " - " + fourthTile,

      colorList[2],
      (stat) => stat < fourthTile && stat >= thirdTile,
      "white"
    ),
    new LegendTile(
      secondTile + " - " + thirdTile,
      colorList[1],
      (stat) => stat < thirdTile && stat >= secondTile,
      "white"
    ),
    new LegendTile(
      firstTile + " - " + secondTile,
      colorList[0],
      (stat) => stat < secondTile && stat >= firstTile,
      "black"
    ),
    new LegendTile("<= 0.0", "#FFFFFF", (stat) => stat <= 0.0, "black"),
  ];

  return legendList;
};

const ChoroplethLegend = () => {
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      {choroplethLegend.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: "flex",
            alignItems: "center", //vertical alignment
            justifyContent: "center", //horizontal alignment
            color: item.textColor,
            height: "10vh",
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ChoroplethLegend;
