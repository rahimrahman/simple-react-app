import React from "react";

import "./ContinueApplicationButton.css";

export const ContinueApplicationButton = () => {
  return (
    <div>
      <button
        type="button"
        className="ec-continue-application-button"
        onClick={() => {
          window.location.href = "https://my.virtahealth.com/apply/get-started";
        }}
      >
        Continue my application
      </button>
    </div>
  );
};
