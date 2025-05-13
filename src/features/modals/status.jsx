import React from "react";

const StatusModal = ({ message, type, onClose }) => {
  if (!message) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 50,
  };

  const modalStyle = {
    maxWidth: "570px",
    borderRadius: "20px",
    backgroundColor: "white",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    border: type === "success" ? "2px solid green" : "2px solid red",
  };

  const headingStyle = {
    paddingBottom: "18px",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: type === "success" ? "green" : "red",
  };

  const dividerStyle = {
    margin: "0 auto 1.5rem",
    height: "4px",
    width: "90px",
    borderRadius: "2px",
    backgroundColor: type === "success" ? "green" : "red",
  };

  const messageStyle = {
    marginBottom: "1.5rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#333",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid red",
    transition: "all 0.3s",
  };

  const detailsButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#0ea5e9",
    color: "white",
    border: "1px solid #0ea5e9",
    transition: "all 0.3s",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={headingStyle}>
          {type === "success" ? "Success!" : "Error!"}
        </h3>
        <div style={dividerStyle}></div>
        <p style={messageStyle}>{message}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "red";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "black";
            }}
          >
            Close
          </button>
          <button
            onClick={onClose}
            style={detailsButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0369a1";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#0ea5e9";
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
