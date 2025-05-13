import React, { useState } from "react";
import api from "../../common/api/connect";

const ReportModal = ({ isOpen, onClose, blogId, userId }) => {
  const [reason, setReason] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/blogs/${blogId}/report`, {
        user_id: userId,
        reason,
      });
      setSubmissionStatus({
        message: "Report submitted successfully!",
        type: "success",
      });
      setReason("");
    } catch (err) {
      console.error(
        "Error submitting report:",
        err.response?.data || err.message
      );
      setSubmissionStatus({
        message: "Failed to submit the report. Please try again.",
        type: "error",
      });
    }
  };

  const handleCloseStatusModal = () => {
    setSubmissionStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
    >
      {!submissionStatus ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            padding: "1rem",
            height: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "1rem",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <svg
                  style={{ width: "20px", height: "20px", color: "#6b7280" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Report Blog
              </h3>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="reason"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  Reason for reporting
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    color: "#111827",
                    backgroundColor: "#f9fafb",
                    resize: "none",
                  }}
                  placeholder="Enter your reason here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "white",
                  backgroundColor: "#1d4ed8",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#2563eb")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: submissionStatus.type === "success" ? "green" : "red",
              marginBottom: "1rem",
            }}
          >
            {submissionStatus.message}
          </h3>
          <button
            onClick={handleCloseStatusModal}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "white",
              backgroundColor: "#1d4ed8",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportModal;
