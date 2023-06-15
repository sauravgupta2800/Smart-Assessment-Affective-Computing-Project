import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Steps } from "antd";
import { getEmotionalStatePosorNeg } from "../UtilMethods";

import array from "../utils/array.png";
import stack from "../utils/stack.png";
import queue from "../utils/queue.png";
const interval = 60;
const WS_URL = "ws://localhost:8080";

const Revision = ({ onCompleted }) => {
  const [wsConnected, setWsConnected] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(interval);
  const [countdown, setCountdown] = useState(null);
  const [mood, setMood] = useState({ 0: [], 1: [], 2: [] });

  useWebSocket(WS_URL, {
    onOpen: () => {
      setWsConnected(true);
      setTimer();
      console.log("WebSocket connection established. Hahahah");
    },
    onMessage: ({ data }) => {
      console.log(mood);
      const obj = JSON.parse(data);
      console.log(
        "Receiving Messages",
        "step: ",
        step,
        " ",
        obj.types,
        " ",
        getEmotionalStatePosorNeg(obj.types)
      );

      setMood((prevState) => {
        return {
          ...prevState,
          [step]: [...prevState[step], getEmotionalStatePosorNeg(obj.types)],
        };
      });
    },
    onClose: () => {
      setWsConnected(false);
    },
  });

  useEffect(() => {
    console.log(time);
    if (time == 0) {
      clearInterval(countdown);
      if (step < 2) {
        setTime(interval);
        setStep((prevStep) => prevStep + 1);
        setTimer();
      } else {
        const bestTopic = getBestTopic();
        console.log("bestTopic: ", bestTopic);
        onCompleted(bestTopic);
      }
    }
  }, [time]);

  const getImage = () => {
    if (step == 0) return array;
    if (step == 1) return stack;
    if (step == 2) return queue;
  };

  const getBestTopic = () => {
    let arrLen = mood[0].filter((item) => item === "positive").length;
    let stackLen = mood[1].filter((item) => item === "positive").length;
    let queueLen = mood[2].filter((item) => item === "positive").length;

    if (arrLen >= stackLen && arrLen >= queueLen) {
      return "array";
    }
    if (stackLen >= arrLen && stackLen >= queueLen) {
      return "stack";
    }
    if (queueLen >= arrLen && queueLen >= stackLen) {
      return "queue";
    }
    return "array";
  };

  const setTimer = () => {
    const countdown = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setCountdown(countdown);

    // Clean up the interval when the component unmounts or when time becomes 0
  };

  const Timer = () => {
    return (
      <span
        className="fw-bold"
        style={{ color: "green" }}
      >{`Left ${time} sec`}</span>
    );
  };

  return (
    <>
      {wsConnected ? (
        <div className="w-100 h-100 revision">
          <div className="revision--header">
            <Steps
              current={step}
              items={[
                {
                  title: "Array",
                  description: "This is a description",
                  subTitle: step == 0 ? <Timer /> : "",
                },
                {
                  title: "Stack",
                  description: "This is a description",
                  subTitle: step == 1 ? <Timer /> : "",
                },
                {
                  title: "Queue",
                  description: "This is a description",
                  subTitle: step == 2 ? <Timer /> : "",
                },
              ]}
            />
          </div>
          <div className="revision--body">
            <img src={getImage()} className="w-100 h-100" />
          </div>
          <div className="revision--footer"></div>
        </div>
      ) : (
        <div className="fs-3 w-100 h-100 d-flex align-items-center justify-content-center">
          <div
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "5px 10px",
            }}
          >
            Run your Server
          </div>
        </div>
      )}
    </>
  );
};

export default Revision;
