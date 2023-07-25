import React from "react";

export const ContinueApplicationButton = () => {
  return (
    <div>
      <button
        type="button"
        style={{
          borderWidth: "1px",
          borderColor: "#FFF",
          margin: "16px",
          padding: "10px 24px 10px 24px",
          backgroundColor: "transparent",
          color: "#FFF",
          fontSize: "20px",
          fontWeight: "700",
          borderRadius: "4px",
          borderStyle: "solid",
        }}
        onClick={() => {
          window.location.href = "https://my.virtahealth.com/apply/get-started";
        }}
      >
        Continue my application
      </button>
    </div>
  );
};
