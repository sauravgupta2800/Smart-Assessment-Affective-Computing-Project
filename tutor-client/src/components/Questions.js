import React, { useState, useEffect } from "react";
import { Radio, Button } from "antd";
import { array } from "../config";
const Questions = ({ currentQuestion = {}, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="questions w-100 h-100">
      <div className="w-100 questions--header d-flex align-items-center justify-content-between px-3">
        <div>
          Category:{" "}
          <span
            className="fw-bold px-2 py-1"
            style={{ textTransform: "capitalize" }}
          >
            {currentQuestion.category}
          </span>
        </div>
        Question Box
        <div>
          Level:{" "}
          <span className="fw-bold px-2 py-1">{currentQuestion.level}</span>
        </div>
      </div>

      <div className="questions--body d-flex flex-column justify-content-between">
        <div>
          {currentQuestion.image ? (
            <img
              src={currentQuestion.image}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          ) : (
            ""
          )}
        </div>
        <div className="pb-3 px-3 d-flex justify-content-between">
          <div className="fw-bold me-3 fs-5">Choose the best Option</div>
          <div>
            <Radio.Group
              defaultChecked={false}
              size="large"
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <Radio.Button value="A">A</Radio.Button>
              <Radio.Button value="B">B</Radio.Button>
              <Radio.Button value="C">C</Radio.Button>
              <Radio.Button value="D">D</Radio.Button>
            </Radio.Group>
            <Button
              disabled={!selectedOption}
              type="primary"
              size="large"
              className="ms-3"
              onClick={() => {
                onSubmit({
                  isCorrect: selectedOption == currentQuestion.correct,
                  currQues: currentQuestion,
                });
                setSelectedOption("");
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
