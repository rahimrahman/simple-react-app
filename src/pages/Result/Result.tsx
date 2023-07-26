import React, { FC } from "react";

import { ContinueApplicationButton } from "../../components/ContinueApplicationButton/ContinueApplicationButton";
import "./Result.css";

type ResultProps = {
  isCovered: boolean;
};
export const Result: FC<ResultProps> = ({ isCovered }) => {
  return (
    <div className="ec-result-container">
      <div className="ec-result-main">
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

      <div className="ec-result-sub">
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
