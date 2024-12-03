import axios from "axios";
import { useEffect, useState } from "react";

function Monitor() {
  const URL = "http://localhost:8080/api";

  const WEBSOCKET_URL = "ws://localhost:8080";
  const [wsConnectionData, setWsConnectionData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(null);

  // const fetchRealtime = async () => {
  //   try {
  //     const response = await axios.get(`${URL}/monitor`);
  //     console.log(response.data);
  //     if (response.data.success) {
  //       setData(response.data.value);
  //     } else {
  //       console.error("Error fetching real-time");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching real-time:", error);
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchRealtime();
  //     setCounter((c) => c + 1);
  //   }, 5000);
  // });

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket(WEBSOCKET_URL); // Update with your WebSocket URL

    // Event listener for when the connection is opened
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection established");
      socket.send(JSON.stringify({ message: "Hello from client!" }));
    });

    // Event listener for incoming messages
    socket.addEventListener("message", (event) => {
      const receivedData = JSON.parse(event.data); // Parse the incoming JSON data
      console.log("New data received:", receivedData);

      // * to differentiate real-time updates
      switch (receivedData.realTimeType) {
        case "ws connection":
          setWsConnectionData(receivedData);
          break;
        case "botstate":
          setData1(receivedData); 
          break;
        case "queue":
          setData2(receivedData);
          break;
      }
    });

    // Event listener for errors
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket error occurred");
    });

    // Event listener for when the connection is closed
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed");
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="text-2xl font-bold">
      <h1>WebSocket Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {wsConnectionData ? (
        <p className="text-wrap">{JSON.stringify(wsConnectionData, null, 2)}</p>
      ) : (
        <p>No data received here yet.</p>
      )}

      {data1 ? (
        <p className="text-wrap">{JSON.stringify(data1, null, 2)}</p>
      ) : (
        <p>No data received here yet.</p>
      )}

      {data2 ? (
        <p className="text-wrap">{JSON.stringify(data2, null, 2)}</p>
      ) : (
        <p>No data received here yet.</p>
      )}
    </div>
  );
}

export default Monitor;
