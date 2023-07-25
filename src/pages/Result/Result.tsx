import React, { FC } from "react";
import { ContinueApplicationButton } from "../../components/ContinueApplicationButton/ContinueApplicationButton";

type ResultProps = {
  isCovered: boolean;
};
export const Result: FC<ResultProps> = ({ isCovered }) => {
  return (
    <div
      style={{
        backgroundColor: "#0D4F40",
        padding: "64px 0px 64px 0px",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "column",
        // flexGrow: 1,
        flex: 1,
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          color: "#FFF",
          textAlign: "center",
          fontSize: "48px",
          fontWeight: "700",
          padding: "16px",
          lineHeight: "56px",
        }}
      >
        {isCovered ? (
          <>
            <div>Good news! Your health plan</div>
            <div>or employer includes Virta.</div>
            <div>Take the next step.</div>
          </>
        ) : (
          <>
            <div>Sorry, we couldn't confirm coverage.</div>
            <div>Here's what you can do.</div>
          </>
        )}
      </div>

      <div
        style={{
          padding: "16px",
          fontSize: "24px",
          color: "#FFF",
          textAlign: "center",
        }}
      >
        {isCovered ? (
          <>
            <div>Complete an application to confirm your health</div>
            <div>conditions are a match for Virta's core model.</div>
          </>
        ) : (
          <>
            <div>Review form to make sure fields are correct, connect with</div>
            <div>Support for help, or continue with an application anyway.</div>
          </>
        )}
      </div>

      <ContinueApplicationButton />
    </div>
  );
};
