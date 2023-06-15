import React, { useState, useEffect } from "react";
import { Button } from "antd";

const HINT_STATUS = {
  INIT: "initial",
  POSITIVE: "+ve",
  NEUTRAL: "neutral",
  NEGATIVE: "-ve",
  TIME_ENDING: "time",
};

const Hint = ({ question = {}, status = HINT_STATUS.INIT, onHintclicked }) => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(false);
  }, [status]);

  return (
    <div className="hint w-100 h-100">
      <div className="w-100 hint--header d-flex align-items-center justify-content-center">
        Hint
      </div>

      {/* INIT */}
      <div className="hint--body w-100">
        {HINT_STATUS.INIT == status && (
          <div
            className="d-flex text-center w-100 flex-column align-items-center justify-content-center p-5"
            style={{ background: "white" }}
          >
            <div style={{ fontSize: "150px" }}>👍</div>
            <div style={{ fontSize: "30px" }}>Take your Time</div>
            <div style={{ fontSize: "30px", fontWeight: "600" }}>
              All the best.
            </div>
          </div>
        )}

        {/* POSITIVE */}
        {HINT_STATUS.POSITIVE == status && (
          <div
            className="d-flex text-center w-100 flex-column align-items-center justify-content-center p-5"
            style={{ background: "#d3fdd3" }}
          >
            <div style={{ fontSize: "150px" }}>🙂</div>
            <div style={{ fontSize: "30px" }}>
              You look focused and in a positive state.
            </div>
            <div
              style={{ fontSize: "30px", fontWeight: "600", marginTop: "15px" }}
            >
              You can do it.
            </div>
          </div>
        )}

        {/* NEUTRAL */}
        {HINT_STATUS.NEUTRAL == status && (
          <div
            className="d-flex text-center w-100 flex-column align-items-center justify-content-center p-5"
            style={{ background: "rgb(238 238 238)" }}
          >
            <div style={{ fontSize: "120px" }}>🤜🤛</div>
            <div style={{ fontSize: "24px" }}>
              I understand your desire to find a solution to this problem.
            </div>
            <div
              style={{ fontSize: "30px", fontWeight: "600", marginTop: "15px" }}
            >
              Delve deeper into your current approach.
            </div>
          </div>
        )}

        {/* NEGATIVE */}
        {HINT_STATUS.NEGATIVE == status && !showHint && (
          <div
            className="d-flex text-center w-100 flex-column align-items-center justify-content-center p-5"
            style={{ background: "#ffd0d0" }}
          >
            <div style={{ fontSize: "150px" }}>😟</div>
            <div style={{ fontSize: "24px" }}>Don't stress too much.</div>
            <div
              style={{ fontSize: "30px", fontWeight: "600", margin: "18px 0" }}
            >
              We have unlocked the hint for you.
            </div>

            <Button
              type="primary"
              size="large"
              className="ms-3"
              onClick={() => {
                setShowHint(true);
                onHintclicked();
              }}
            >
              Do you want to see Hint?
            </Button>
          </div>
        )}
        {HINT_STATUS.NEGATIVE == status && showHint && (
          <img
            src={question.hint}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}

        {/* TIME ENDING */}
        {HINT_STATUS.TIME_ENDING == status && !showHint && (
          <div
            className="d-flex text-center w-100 flex-column align-items-center justify-content-center p-5"
            style={{ background: "#ffd0d0" }}
          >
            <div style={{ fontSize: "150px" }}>🕗</div>
            <div style={{ fontSize: "24px" }}>Time is running out!</div>
            <div
              style={{ fontSize: "30px", fontWeight: "600", margin: "18px 0" }}
            >
              You can see hint
            </div>

            <Button
              type="primary"
              size="large"
              className="ms-3"
              onClick={() => {
                setShowHint(true);
                onHintclicked();
              }}
            >
              Do you want to see Hint?
            </Button>
          </div>
        )}
        {HINT_STATUS.TIME_ENDING == status && showHint && (
          <img
            src={question.hint}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
        {/* <img
          src={question.hint}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        /> */}
      </div>
    </div>
  );
};

export default Hint;
