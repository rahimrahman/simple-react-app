import { FormFields } from "../pages/Form/Form";

export const trackSubmissionAmplitude = (
  data: FormFields,
  isEligible: boolean
) => {
  // @ts-ignore
  const amplitude = window.amplitude;
  if (amplitude) {
    amplitude.getInstance().logEvent("Submitted Eligibility Checker", {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      is_eligible: isEligible,
    });
  }
};

export const postEligibilityValidation = async (data: FormFields) => {
  try {
    // TODO: replace with env variable for prod vs stage
    const response = await fetch(
      "https://eligibility-api-gateway.stage.virta.dev/v1/coverage_eligibility/validate_applicant",
      {
        method: "POST",
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          dob: data.dateOfBirth,
          member_id: data.memberId,
          payor_id: data.insurance,
        }),
      }
    );
    const validation = await response.json();
    return validation.is_eligible;
  } catch (error) {
    console.error(error);
    return false;
  }
};
