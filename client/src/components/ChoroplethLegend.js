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
  //   for (let i = 0; i < 5; i++) {
  //     const currVal = lower + i * step;
  //     const nextVal = lower + (i + 1) * step;
  //     if (Math.abs(upper - nextVal) < 0.001) {
  //       legendList.push(
  //         new LegendTile(
  //           upper + "+",
  //           colorList[i],
  //           (stat) => stat >= currVal,
  //           "white"
  //         )
  //       );
  //     } else {
  //       legendList.push(
  //         new LegendTile(
  //           currVal + " - " + nextVal,
  //           colorList[i],
  //           (stat) => stat >= currVal && stat < nextVal,
  //           "white"
  //         )
  //       );
  //     }
  //   }
  //   legendList.push(
  //     new LegendTile("<= 0.0", "#FFFFFF", (stat) => stat <= 0.0, "black")
  //   );
  return legendList;
};
// export const choroplethLegend =
// [
//   new LegendTile("40.0 +", "#123456", (stat) => stat >= 40.0, "white"),
//   new LegendTile(
//     "30.0 - 40.0",
//     "#29465B",
//     (stat) => stat < 40.0 && stat >= 30.0,
//     "white"
//   ),
//   new LegendTile(
//     "25.0 - 30.0",
//     "#36454F",
//     (stat) => stat < 30.0 && stat >= 25.0,
//     "white"
//   ),
//   new LegendTile(
//     "15.0 - 25.0",
//     "#566D7E",
//     (stat) => stat < 25.0 && stat >= 15.0,
//     "black"
//   ),
//   new LegendTile(
//     "0.0 - 15.0",
//     "#95B9C7",
//     (stat) => stat < 15.0 && stat > 0.0,
//     "black"
//   ),
//   new LegendTile("<= 0.0", "#FFFFFF", (stat) => stat <= 0.0, "black"),
// ];

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
