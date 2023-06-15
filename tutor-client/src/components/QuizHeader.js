import React, { useState, useEffect } from "react";
import { CloseCircleFilled } from "@ant-design/icons";

const QuizHeader = ({ time, correct = 3, incorrect = 4, count }) => {
  const showCorrectFilled = (index) => {
    return index < correct;
  };
  const showInCorrectFilled = (index) => {
    return index < incorrect;
  };
  return (
    <div className="w-100 h-100 d-flex justify-content-between align-items-center">
      <div>
        <div
          className="mb-1 fw-bold"
          style={{ fontSize: "1.2rem", color: "green" }}
        >
          Total Correct Questions
        </div>
        <div className="d-flex">
          {Array(count)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: showCorrectFilled(index) ? "#1fb81f" : "",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  border: "4px solid green",
                  color: showCorrectFilled(index) ? "white" : "green",
                  borderRadius: "5px",
                }}
                className="d-flex justify-content-center align-items-center fw-bold fs-4"
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="mb-1 fw-bold" style={{ fontSize: "1.2rem" }}>
          Timer
        </div>
        <div
          style={{
            width: "fil;-content",
            height: "50px",
            border: "4px solid gray",
            borderRadius: "5px",
          }}
          className="d-flex justify-content-center align-items-center fw-bold fs-4 px-4"
        >
          {`${time} sec`}
        </div>
      </div>
      <div>
        <div
          className="mb-1 fw-bold"
          style={{ fontSize: "1.2rem", color: "#b24141" }}
        >
          Total Incorrect Questions
        </div>
        <div className="d-flex">
          {Array(count)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: showInCorrectFilled(index) ? "#f94242" : "",
                  width: "50px",
                  height: "50px",
                  marginLeft: index == 0 ? "0" : "10px",
                  border: "4px solid #b24141",
                  color: showInCorrectFilled(index) ? "white" : "#b24141",
                  borderRadius: "5px",
                }}
                className="d-flex justify-content-center align-items-center fw-bold fs-4"
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
