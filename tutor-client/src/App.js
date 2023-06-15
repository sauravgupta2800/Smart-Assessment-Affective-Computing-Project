// import logo from "./logo.svg";
import { useState } from "react";
import "../src/styles/app.scss";
import Header from "./components/Header";
import QuizPortal from "./components/QuizPortal";
import Revision from "./components/Revision";

function App() {
  const [initialTopic, setInitialTopic] = useState("");

  const handleRevisionCompleted = (type) => {
    console.log("handleRevisionCompleted: ", type);
    setInitialTopic(type);
  };

  return (
    <div className="app">
      <div className="main-layout">
        <div className="main-layout__header">
          <Header />
        </div>

        <div className={`main-layout__container d-flex justify-content-center`}>
          <div className={`content-width`}>
            {initialTopic ? (
              <QuizPortal initialTopic={initialTopic} />
            ) : (
              <Revision onCompleted={(type) => handleRevisionCompleted(type)} />
            )}
            {/* <Revision onCompleted={(type) => handleRevisionCompleted(type)} />
             */}
            {/* <QuizPortal initialTopic={"array"} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
