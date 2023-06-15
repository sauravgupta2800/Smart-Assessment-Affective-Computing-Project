const https = require("https");
const { padCalculation } = require("./Utils");

const WebSocket = require("ws");

const agent = new https.Agent({
  rejectUnauthorized: false,
});
const socket = new WebSocket("wss://localhost:6868", { agent });
const server = new WebSocket.Server({ port: 8080 });

const clientId = "3u8ikzhKFQHiU40vaf4rUyQU6S9o8G1jijqYmgcE";
const clientSecret =
  "aF0v8zRbzH6bU5Fmx73iGxjQ55XsF8zmoSXSUUtGEbL0egi7Q40uuxMh5tY7CUigGzq4bdNjDwdtAG8zpagss2TbFZKGkDnEk0C01JTUZhJcdEepS1FyFMzonGfkAU2Q";
let cortexToken = "";
let sessionID = "";
const streams = ["met"];
const headset = "INSIGHT-5A083E00"; // virtual
// const headset = "INSIGHT-5A688D41"; // real
var clientSideMessageSocket = null;

socket.on("open", function () {
  console.log("WebSocket connection established.");
  socket.send(
    JSON.stringify({
      jsonrpc: "2.0",
      method: "authorize",
      params: {
        clientId,
        clientSecret,
        // license: "<YOUR_LICENSE>",
        debit: 1,
      },
      id: 10,
    })
  );

  socket.send(
    JSON.stringify({
      jsonrpc: "2.0",
      method: "requestAccess",
      params: {
        clientId,
        clientSecret,
      },
      id: 1,
    })
  );
});

socket.on("message", function (message) {
  console.log(JSON.parse(`${message}`));
  const { result, id, time } = JSON.parse(`${message}`);

  if (id === 10) {
    cortexToken = result.cortexToken;
    socket.send(
      JSON.stringify({
        jsonrpc: "2.0",
        method: "createSession",
        params: {
          cortexToken,
          headset,
          status: "active",
        },
        id: 11,
      })
    );
  }
  if (id == 11) {
    sessionID = result.id;

    console.log("cortexToken: ", cortexToken);

    socket.send(
      JSON.stringify({
        id: 12,
        jsonrpc: "2.0",
        method: "subscribe",
        params: {
          cortexToken,
          session: sessionID,
          streams,
        },
      })
    );
  }
  if (id === 12) {
    // extract columns info
    const { success = [] } = result;
    console.log("Received message:", result.success);
    let columns = "time";
    success.forEach(({ cols }) => {
      columns = columns + "," + cols.join(",");
    });
  }

  if (!id && time) {
    const res = JSON.parse(`${message}`);
    // let row = res["time"];
    let row = Date.now();

    streams.forEach((stream) => {
      row = row + "," + res[stream];
    });

    const { pad, types } = padCalculation(row);

    if (clientSideMessageSocket != null) {
      clientSideMessageSocket.send(JSON.stringify({ pad, types }));
    }
  }
});

server.on("connection", (soc) => {
  clientSideMessageSocket = soc;
  console.log("Client connected.");

  soc.on("close", () => {
    console.log("Client disconnected.");
  });
});
