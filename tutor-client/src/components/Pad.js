import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Pad = ({ emotionalState = [] }) => {
  const currentEmotionalState = () => {
    const length = emotionalState.length;
    if (length) {
      return emotionalState[length - 1].types;
    }
    return null;
  };
  const data = [
    {
      x: emotionalState.map(({ pad }) => pad[0]),
      y: emotionalState.map(({ pad }) => pad[1]),
      z: emotionalState.map(({ pad }) => pad[2]),
      mode: "markers",
      type: "scatter3d",
      marker: {
        size: 8, // Adjust the size value to make the points smaller
      },
    },
  ];

  const layout = {
    scene: {
      xaxis: {
        title: {
          text: "P",
          font: {
            color: "red",
            weight: "bold",
          },
        },
        nticks: 10,
        range: [-1, 1],
        showgrid: true,
        zeroline: true,
      },
      yaxis: {
        title: {
          text: "A",
          font: {
            color: "green",
            weight: "bold",
          },
        },
        nticks: 10,
        range: [-1, 1],
        showgrid: true,
        zeroline: true,
      },
      zaxis: {
        title: {
          text: "D",
          font: {
            color: "blue",
            weight: "bold",
          },
        },
        nticks: 10,
        range: [-1, 1],
        showgrid: true,
        zeroline: true,
      },
      aspectratio: { x: 1, y: 1, z: 1 },
      camera: {
        eye: { x: 1.8, y: 1.8, z: 0.6 },
        center: { x: 0, y: 0, z: 0 },
        up: { x: 0, y: 0, z: 1 },
      },
    },
  };
  const config = {
    displayModeBar: false,

    editable: false,
    modeBarButtonsToRemove: ["hoverCompareCartesian"], // Remove specific mode bar buttons
  };
  const { engagement, excitement, interest, relax, stress } =
    currentEmotionalState() || {};
  return (
    <div className="hint w-100 h-100">
      <div className="w-100 hint--header d-flex align-items-center justify-content-center">
        Pad
      </div>

      <div
        className="hint--body d-flex flex-column"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <Plot
          data={data}
          layout={layout}
          config={config}
          style={{ width: "500px", height: "500px" }}
        />

        {currentEmotionalState() && (
          <div className="p-4">
            <table>
              <thead>
                <tr>
                  <th>Current Emotional state</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Engagement</td>
                  <td style={{ color: engagement > 0.5 ? "green" : "red" }}>
                    {engagement}
                  </td>
                </tr>
                <tr>
                  <td>Excitement</td>
                  <td style={{ color: excitement > 0.5 ? "green" : "red" }}>
                    {excitement}
                  </td>
                </tr>
                <tr>
                  <td>Interest</td>
                  <td style={{ color: interest > 0.5 ? "green" : "red" }}>
                    {interest}
                  </td>
                </tr>
                <tr>
                  <td>Relax</td>
                  <td style={{ color: relax > 0.5 ? "green" : "red" }}>
                    {relax}
                  </td>
                </tr>
                <tr>
                  <td>Stress</td>
                  <td>{currentEmotionalState().stress}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pad;
