import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import useWebSocket from "react-use-websocket";
import { getEmotionalState } from "../../src/UtilMethods";
import QuizHeader from "./QuizHeader";
import Hint from "./Hint";
import Pad from "./Pad";
import ResultDrawer from "./ResultDrawer";
import Questions from "./Questions";
import { array, stack, queue } from "../config";
import { message } from "antd";

const WS_URL = "ws://localhost:8080";
const boxCount = 6;
const questionInterval = 60;
const topics = {
  array: array,
  stack: stack,
  queue: queue,
};

const HINT_STATUS = {
  INIT: "initial",
  POSITIVE: "+ve",
  NEUTRAL: "neutral",
  NEGATIVE: "-ve",
  TIME_ENDING: "time",
};

const QuizPortal = ({ initialTopic = "array" }) => {
  const [time, setTime] = useState(questionInterval);
  const [countdown, setCountdown] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currTopic, setCurrTopic] = useState("");
  const [indices, setIndices] = useState({
    array: -1,
    stack: -1,
    queue: -1,
  });

  const [hintStatus, setHintStatus] = useState(HINT_STATUS.INIT);
  const [hintClicked, setHintclicked] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  /* ***********************
        WEBSOCKET
  *********************** */
  const [emotionalState, setEmotionalState] = useState([]);
  const [currentEmotionalState, setCurrentEmotionalState] = useState({});

  const [openResult, setOpenResult] = useState(false);

  useWebSocket(WS_URL, {
    onMessage: ({ data }) => {
      const obj = JSON.parse(data);
      console.log(
        "Receiving Messages",
        obj.types,
        " ",
        getEmotionalState(obj.types)
      );

      setEmotionalState((prevState) => {
        return [...prevState, obj.types];
      });
      setCurrentEmotionalState(obj.types);
    },
  });

  useEffect(() => {
    setIndices((prevState) => {
      return {
        ...prevState,
        [initialTopic]: prevState[initialTopic] + 1,
      };
    });
    setCurrTopic(initialTopic);
    setTimer();
    setHintStatus(HINT_STATUS.INIT);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(countdown);
      handleSubmitQuestion({
        isCorrect: false,
        currQues: topics[currTopic][indices[currTopic]],
      });
    }
    if (time > 0) {
      hintoperations(time);
    }
  }, [time]);

  const hintoperations = (time) => {
    console.log("time: ", time);
    if (time <= 45) {
      const state = getEmotionalState(currentEmotionalState);
      console.log("state: ", state);
      if (
        [HINT_STATUS.POSITIVE, HINT_STATUS.NEUTRAL].includes(hintStatus) &&
        time == 15
      ) {
        setHintStatus(HINT_STATUS.TIME_ENDING);
      } else if (
        [HINT_STATUS.POSITIVE, HINT_STATUS.NEUTRAL].includes(hintStatus) &&
        state === "negative"
      ) {
        setHintStatus(HINT_STATUS.NEGATIVE);
      } else if ([HINT_STATUS.INIT].includes(hintStatus)) {
        if (state == "positive") {
          setHintStatus(HINT_STATUS.POSITIVE);
        } else if (state == "neutral") {
          setHintStatus(HINT_STATUS.NEUTRAL);
        } else if (state == "negative") {
          setHintStatus(HINT_STATUS.NEGATIVE);
        }
      }
    }
  };

  const setTimer = () => {
    clearInterval(countdown);
    setCountdown(null);
    setTime(questionInterval);
    const c = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setCountdown(c);
  };

  const handleSubmitQuestion = ({ isCorrect, currQues }) => {
    setHintStatus(HINT_STATUS.INIT);
    console.log("is Correct: ", isCorrect);

    // 1. Update the answered Questions list to track history
    const prevAnsweredQuestions = cloneDeep(answeredQuestions);
    prevAnsweredQuestions.push({
      ...currQues,
      ...currentEmotionalState,
      correct: isCorrect,
      seenHint: hintClicked,
      emotionType: getEmotionalState(currentEmotionalState),
      timeLeft: time,
    });

    setAnsweredQuestions(prevAnsweredQuestions);

    console.log(prevAnsweredQuestions);
    setHintclicked(false);
    clearInterval(countdown);
    // 2. Check if test finished
    if (
      totalCorrect(prevAnsweredQuestions) === boxCount ||
      totalIncorrect(prevAnsweredQuestions) === boxCount
    ) {
      console.log("Thankyou!! Quiz finished!!");
      messageApi.open({
        type: "success",
        content: "Thankyou!! Quiz finished!!",
      });
      setOpenResult(true);
      return;
    }

    // 4. Set Timer
    setTimer();

    // 3. Get next question
    if (isCorrect) {
      setIndices((prevState) => {
        return {
          ...prevState,
          [currTopic]: prevState[currTopic] + 1,
        };
      });
    } else {
      // 1. check for topic change, if num of wrong is 2 or more for current topic
      const allIncorrect = prevAnsweredQuestions.filter(
        ({ correct }) => !correct
      );

      const incorrectCurrentTopicCount = allIncorrect.filter(
        ({ category }) => category === currTopic
      ).length;
      if (incorrectCurrentTopicCount >= 2) {
        console.log("CHECK FOR TOPIC CHANGE", allIncorrect);
        // change the currtopic to another topic whose incorrect answers count is less than 2
        const incorrectArrayCount = allIncorrect.filter(
          ({ category }) => category === "array"
        ).length;
        const incorrectStackCount = allIncorrect.filter(
          ({ category }) => category === "stack"
        ).length;
        const incorrectQueueCount = allIncorrect.filter(
          ({ category }) => category === "queue"
        ).length;

        if (incorrectArrayCount < 2) {
          setIndices((prevState) => {
            return {
              ...prevState,
              array: prevState["array"] + 1,
            };
          });
          setCurrTopic("array");
        } else if (incorrectStackCount < 2) {
          setIndices((prevState) => {
            return {
              ...prevState,
              stack: prevState["stack"] + 1,
            };
          });
          setCurrTopic("stack");
        } else if (incorrectQueueCount < 2) {
          setIndices((prevState) => {
            return {
              ...prevState,
              queue: prevState["queue"] + 1,
            };
          });
          setCurrTopic("queue");
        }
      } else {
        console.log("CONTROL");
        // if current topic's count is less than 2, continue with the current topic, just change the count
        setIndices((prevState) => {
          return {
            ...prevState,
            [currTopic]: prevState[currTopic] + 1,
          };
        });
      }
    }
  };

  const totalCorrect = (list) => {
    return list.filter(({ correct }) => correct).length;
  };

  const totalIncorrect = (list) => {
    return list.filter(({ correct }) => !correct).length;
  };

  const getCurrentQuestion = () => {
    if (topics[currTopic]) return topics[currTopic][indices[currTopic]];
    return {};
  };

  return (
    <div className="w-100 h-100 portal">
      <div className="portal--header">
        <QuizHeader
          time={time}
          count={boxCount}
          correct={totalCorrect(answeredQuestions)}
          incorrect={totalIncorrect(answeredQuestions)}
        />
      </div>
      <div className="portal--body">
        <div className="left">
          {topics[currTopic] && (
            <Questions
              currentQuestion={getCurrentQuestion()}
              onSubmit={handleSubmitQuestion}
            />
          )}
        </div>
        <div className="right ps-3">
          <div className="h-100">
            <Hint
              status={hintStatus}
              question={getCurrentQuestion()}
              onHintclicked={() => setHintclicked(true)}
            />
          </div>
          {/* <div className="h-60">
            <Pad emotionalState={emotionalState} />
          </div> */}

          <ResultDrawer
            dataSource={answeredQuestions}
            open={openResult}
            onClose={() => setOpenResult(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPortal;
