import React, { FC, useEffect } from "react";

import { ContinueApplicationButton } from "../../components/ContinueApplicationButton/ContinueApplicationButton";
import "./Result.css";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { MultiOrSingleLineTextByWidth } from "../../components/MultiOrSingleLineTextByWidth/MultiOrSingleLineTextByWidth";

type ResultProps = {
  isCovered: boolean;
};
export const Result: FC<ResultProps> = ({ isCovered }) => {
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const scrollToDivRoot = () => {
      const section = document.querySelector("#root");
      if (section) {
        section.scrollIntoView();
      }
    };
    scrollToDivRoot();
  }, []);

  return (
    <div className="ec-result-container">
      <div className="ec-result-main">
        {isCovered ? (
          <MultiOrSingleLineTextByWidth
            text={[
              "Good news! Your health plan",
              "or employer includes Virta.",
              "Take the next step.",
            ]}
            width={windowWidth}
          />
        ) : (
          <MultiOrSingleLineTextByWidth
            text={["Sorry, we couldn't confirm coverage."]}
            width={windowWidth}
          />
        )}
      </div>

      <div className="ec-result-sub">
        {isCovered ? (
          <MultiOrSingleLineTextByWidth
            text={[
              "Complete an application to confirm your health",
              "conditions are a match for Virta's care model.",
            ]}
            width={windowWidth}
          />
        ) : (
          <MultiOrSingleLineTextByWidth
            text={[
              "Continue with an application to confirm your health conditions",
              " are a match for Virta's care model. You can also update your",
              "coverage information during the application process.",
            ]}
            width={windowWidth}
          />
        )}
      </div>

      <div>
        <ContinueApplicationButton />
        {!isCovered && (
          <div style={{ textAlign: "center" }}>
            <a
              href="https://virtahealth.zendesk.com/hc/en-us/requests/new?ticket_form_id=9520802942355"
              className="ec-result-contactsupport"
            >
              Contact Support
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
