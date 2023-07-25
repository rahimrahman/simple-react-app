import React, { useState, useRef, FC } from "react";
import { TextInput } from "../../components/TextInput/TextInput";
import { WavyHeader } from "../../components/WavyHeader/WavyHeader";
import { SelectInput } from "../../components/SelectInput/SelectInput";
import { CheckEligibilityButton } from "../../components/CheckEligibilityButton/CheckEligibilityButton";

type FormProps = {
  onSubmit: (isCovered: boolean) => void;
  testID?: string;
};
const initialErrors = {
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  insurance: "",
  memberId: "",
};
const fieldsMap: Record<string, string> = {
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  insurance: "Insurance Carrier or Employer",
  memberId: "Member ID",
};
export const Form: FC<FormProps> = ({ onSubmit }) => {
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const formFields = useRef<Record<string, string>>({ ...initialErrors });

  const handleOnSubmit = () => {
    let isValidated = true;
    setErrors(initialErrors);

    let newErrors = { ...initialErrors };
    Object.keys(formFields.current).forEach((key) => {
      if (!formFields.current[key]) {
        // TODO: undo comment before production
        isValidated = false;
        newErrors = {
          ...newErrors,
          [key]: `${fieldsMap[key]} is required`,
        };
      }
    });

    if (!newErrors.email) {
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        formFields.current.email
      );
      if (!isEmail) {
        isValidated = false;
        newErrors = {
          ...newErrors,
          email: "Please enter a valid email address",
        };
      }
    }

    if (!newErrors.memberId) {
      const isValidMemberId = /^[a-z0-9]+$/i.test(formFields.current.memberId);

      if (!isValidMemberId) {
        isValidated = false;
        newErrors = {
          ...newErrors,
          memberId: "Member ID should be numbers and letters only",
        };
      }
    }

    setErrors(newErrors);

    if (isValidated) {
      setErrors(initialErrors);
      setIsLoading(true);

      if (formFields.current.email === "show.loading.2000@virtahealth.com") {
        setTimeout(() => {
          setIsLoading(false);
          onSubmit(true);
        }, 2000);
      } else if (
        formFields.current.email === "show.not.covered@virtahealth.com"
      ) {
        setIsLoading(false);
        onSubmit(false);
      } else {
        setIsLoading(false);
        // TODO: send to backend
        // TODO: send to Amplitude
        // TODO: send to
        onSubmit(true);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0D4F40",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <WavyHeader />

      <div style={{ display: "flex", flexDirection: "row", padding: "24px" }}>
        <div style={{ display: "flex", flex: 1 }}></div>
        <div style={{ display: "flex", flex: 3, flexDirection: "column" }}>
          <FormRow>
            <TextInput
              label={"First Name"}
              error={errors.firstName}
              onChange={(e) => {
                formFields.current.firstName = e.target.value;
              }}
              testID="first-name-input"
            />
            <TextInput
              label={"Last Name"}
              error={errors.lastName}
              onChange={(e) => {
                formFields.current.lastName = e.target.value;
              }}
              testID="last-name-input"
            />
          </FormRow>
          <FormRow>
            <TextInput
              label={"Email address"}
              onChange={(e) => {
                formFields.current.email = e.target.value;
              }}
              error={errors.email}
              testID="email-input"
            />
            <TextInput
              label={"Date of birth"}
              type={"date"}
              error={errors.dateOfBirth}
              onChange={(e) => {
                formFields.current.dateOfBirth = e.target.value;
              }}
              testID="date-of-birth-input"
            />
          </FormRow>
          <FormRow>
            <SelectInput
              label={"Insurance Carrier or Employer"}
              error={errors.insurance}
              onChange={(e) => {
                formFields.current.insurance = e.target.value;
              }}
              testID="insurance-input"
            />

            <TextInput
              label={"Member ID"}
              error={errors.memberId}
              onChange={(e) => {
                formFields.current.memberId = e.target.value;
              }}
              testID="member-id-input"
            />
          </FormRow>
        </div>
        <div
          data-testid="submit-button"
          style={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
          }}
          onClick={handleOnSubmit}
        >
          <CheckEligibilityButton isLoading={isLoading} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          color: "#FFFFFF",
          fontSize: "16px",
          justifyContent: "center",
        }}
      >
        By signing up you agree to receive periodic emails from Virta. You can
        opt-out at any time.{" "}
        <a href="/privacypolicy" style={{ color: "#FFFFFF" }}>
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
    }}
  >
    {children}
  </div>
);
