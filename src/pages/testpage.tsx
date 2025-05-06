import React, { useState, useEffect } from "react";
import api from "../common/api/route";

const TestConnection = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await api.get("/test");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error connecting to the backend:", error);
        setMessage("Failed to connect to the backend.");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;
