import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Tag } from "antd";
import CsvDownloadButton from "react-json-to-csv";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// const dataSource = [
//   {
//     id: "array-easy-1",
//     level: "Easy",
//     category: "array",
//     correct: true,
//     seenHint: true,
//     timeLeft: 53,
//     engagement: 0.14,
//     excitement: 0.2,
//     stress: 0.15,
//     relax: 0.18,
//     interest: 0.17,
//     focus: 0.13,
//     emotionalType: "neutral",
//   },
//   {
//     id: "array-easy-2",
//     level: "Easy",
//     category: "array",
//     correct: false,
//     seenHint: false,
//     timeLeft: 0,
//     engagement: 0.14,
//     excitement: 0.2,
//     stress: 0.15,
//     relax: 0.18,
//     interest: 0.17,
//     focus: 0.13,
//     emotionalType: "neutral",
//   },
// ];

const columns = [
  {
    title: "Category (Array/Stack/Queue)",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Level (Easy/Medium/Hard)",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Correct",
    dataIndex: "correct",
    key: "correct",
    render: (_, record) => (
      <span>
        {record.correct ? (
          <Tag color={"green"} style={{ fontSize: "16px", padding: "0px 5px" }}>
            Correct
          </Tag>
        ) : (
          <Tag color={"red"} style={{ fontSize: "16px", padding: "0px 5px" }}>
            Incorrect
          </Tag>
        )}
      </span>
    ),
  },
  {
    title: "Seen hint ?",
    dataIndex: "seenHint",
    key: "seenHint",
    render: (_, record) => (
      <span>
        {record.seenHint ? (
          <CheckOutlined style={{ fontSize: "17px" }} color="green" />
        ) : (
          <CloseOutlined style={{ fontSize: "17px" }} color="red" />
        )}
      </span>
    ),
  },
  {
    title: "Time_Taken (Max 60 sec)",
    dataIndex: "timeLeft",
    key: "timeLeft",
    render: (_, record) => <span>{60 - record.timeLeft}</span>,
  },
  {
    title: "Emotional Type (+ve/-ve/Neutral)",
    dataIndex: "emotionType",
    key: "emotionType",
  },
  {
    title: "Emotional State: Engagement",
    dataIndex: "engagement",
    key: "engagement",
  },
  {
    title: "Emotional State: Excitement",
    dataIndex: "excitement",
    key: "excitement",
  },
  {
    title: "Emotional State: Stress",
    dataIndex: "stress",
    key: "stress",
  },
  {
    title: "Emotional State: Relax",
    dataIndex: "relax",
    key: "relax",
  },
  {
    title: "Emotional State: Interest",
    dataIndex: "interest",
    key: "interest",
  },
  {
    title: "Emotional State: Focus",
    dataIndex: "focus",
    key: "focus",
  },
];
const ResultDrawer = ({ dataSource = [], open, onClose }) => {
  const isPassed = () => {
    const list = dataSource.filter(({ correct }) => correct).length;
    return list >= 6;
  };

  return (
    <Drawer
      title={<h2>Result Section</h2>}
      placement="right"
      onClose={onClose}
      open={open}
      size="large"
      width={"90%"}
    >
      {isPassed() ? (
        <div
          style={{
            border: "1px solid",
            borderRadius: "10px",
            background: "#d3fdd3",
            padding: "10px 10px",
            fontSize: "18px",
            color: "green",
          }}
        >
          <span style={{ fontWeight: "600" }}>Congratulations 👏 !!</span> on
          your achievement in passing the test! We will be reviewing all the
          applications and comparing them to assess their competitiveness. If
          your profile stands out among the applicants, we will reach out to you
          for further consideration.
        </div>
      ) : (
        <div
          style={{
            border: "1px solid",
            borderRadius: "10px",
            background: "#ffe5e5",
            padding: "10px 10px",
            fontSize: "18px",
            color: "red",
          }}
        >
          😞 We apologize, but we must inform you that you did not pass the
          preliminary round.
        </div>
      )}

      <Table
        style={{ border: "1px solid", marginTop: "10px", borderRadius: "2px" }}
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["none", "none"] }}
      />
      <div className="mt-4 mb-4">
        <CsvDownloadButton
          data={dataSource}
          delimiter=","
          style={{
            //pass other props, like styles
            boxShadow: "inset 0px 1px 0px 0px #e184f3",
            background: "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
            backgroundColor: "#c123de",
            borderRadius: "6px",
            border: "1px solid #a511c0",
            display: "inline-block",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "bold",
            padding: "6px 24px",
            textDecoration: "none",
            textShadow: "0px 1px 0px #9b14b3",
          }}
        >
          Download Result as CSV ✨
        </CsvDownloadButton>
      </div>
    </Drawer>
  );
};

export default ResultDrawer;
