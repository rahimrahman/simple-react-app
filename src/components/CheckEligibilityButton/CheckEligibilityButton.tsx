import React, { FC } from "react";
import "./CheckEligibilityButton.css";

type CheckEligibilityButtonProps = {
  isLoading?: boolean;
};

export const CheckEligibilityButton: FC<CheckEligibilityButtonProps> = ({
  isLoading = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        fontSize: "20px",
        fontWeight: "700",
        color: "#FFFFFF",
      }}
    >
      {isLoading ? (
        <>
          <div className="icon loading-icon">
            <LoadingSVG />
          </div>
          <div>Checking</div>
          <div>Eligibility...</div>
        </>
      ) : (
        <>
          <div className="icon">
            <ArrowSVG />
          </div>
          <div>Check</div>
          <div>Eligibility</div>
        </>
      )}
    </div>
  );
};

const LoadingSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" fill="none">
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
      d="M29.155 56.247A19.25 19.25 0 0 0 63.25 44.004v-5.257M58 30.795a19.25 19.25 0 0 0-33.25 13.21v3.5"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
      d="m70.25 45.754-7-7-7 7M17.75 40.504l7 7 7-7"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M43.996 1.973c-23.196 0-42 18.804-42 42s18.804 42 42 42 42-18.804 42-42-18.804-42-42-42Z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="97"
    height="97"
    viewBox="0 0 97 97"
    fill="none"
  >
    <path
      d="M66.0859 48.0273H30.0859"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M51.0859 33.0273L66.0859 48.0273L51.0859 63.0273"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.0859 90.0273C71.2819 90.0273 90.0859 71.2233 90.0859 48.0273C90.0859 24.8314 71.2819 6.02734 48.0859 6.02734C24.89 6.02734 6.08594 24.8314 6.08594 48.0273C6.08594 71.2233 24.89 90.0273 48.0859 90.0273Z"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
