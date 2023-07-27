import React, { useEffect, useState, useRef, FC } from "react";
import { TextInput } from "../../components/TextInput/TextInput";
import { WavyHeader } from "../../components/WavyHeader/WavyHeader";
import { SelectInput } from "../../components/SelectInput/SelectInput";
import { CheckEligibilityButton } from "../../components/CheckEligibilityButton/CheckEligibilityButton";
import "./Form.css";
import {
  getPayors,
  postEligibilityValidation,
  trackSubmissionAmplitude,
} from "../../utils/networkRequests";
import { SelectOption } from "../../types";
import { STAGING_SELECT_OPTIONS } from "../../constants";

export type FormFields = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  // payorId: string;
  insurance: string;
  memberId: string;
  [key: string]: string;
};

type FormProps = {
  onSubmit: (isCovered: boolean) => void;
  testID?: string;
};

const INITIAL_DATA: FormFields = {
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  insurance: "",
  // payorId: "",
  memberId: "",
};

const fieldsMap: Record<string, string> = {
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  insurance: "Insurer",
  payorId: "Insurer",
  memberId: "Member ID",
};

export const Form: FC<FormProps> = ({ onSubmit }) => {
  const [errors, setErrors] = useState({
    ...INITIAL_DATA,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const formFields = useRef<FormFields>({
    ...INITIAL_DATA,
  });
  const isOptionsLoaded = useRef(false);

  useEffect(() => {
    const runAsyncFunction = async () => {
      isOptionsLoaded.current = true;
      const options = await getPayors();

      if (process.env.REACT_APP_ENV !== "production") {
        options.push(...STAGING_SELECT_OPTIONS);
      }
      setSelectOptions(options);
    };
    if (!isOptionsLoaded.current) {
      runAsyncFunction();
    }
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    formFields.current[name] = e.target.value;
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleOnSubmit = async () => {
    let isValidated = true;
    setErrors({ ...INITIAL_DATA });

    let newErrors = { ...INITIAL_DATA };
    Object.keys(formFields.current).forEach((key: string) => {
      if (!formFields.current[key]) {
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
      setErrors({ ...INITIAL_DATA });
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
        const isEligible = await postEligibilityValidation(formFields.current);
        trackSubmissionAmplitude(formFields.current, isEligible);

        setIsLoading(false);
        onSubmit(isEligible);
      }
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#0D4F40",
        borderRadius: "inherit",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        minHeight: "inherit",
      }}
    >
      <WavyHeader />

      <div style={{ display: "flex", flexDirection: "row", padding: "24px" }}>
        <div style={{ display: "flex", flex: 1 }}></div>
        <div className="ec-form-main">
          <FormRow>
            <TextInput
              label={"First Name"}
              error={errors.firstName}
              name={"firstName"}
              onChange={handleOnChange}
              testID="first-name-input"
            />
            <TextInput
              label={"Last Name"}
              error={errors.lastName}
              name={"lastName"}
              onChange={handleOnChange}
              testID="last-name-input"
            />
          </FormRow>
          <FormRow>
            <TextInput
              label={"Email Address"}
              name={"email"}
              onChange={handleOnChange}
              error={errors.email}
              testID="email-input"
            />
            <TextInput
              label={"Date of Birth"}
              name="dateOfBirth"
              type={"date"}
              error={errors.dateOfBirth}
              onChange={handleOnChange}
              testID="date-of-birth-input"
            />
          </FormRow>
          <FormRow>
            <SelectInput
              label={"Insurer"}
              error={errors.insurance}
              onChange={(e) => {
                formFields.current.insurance = e.target.value;
                if (errors.insurance) {
                  setErrors({ ...errors, insurance: "" });
                }
              }}
              options={selectOptions}
              testID="insurance-input"
            />

            <TextInput
              error={errors.memberId}
              label={"Member ID"}
              name="memberId"
              onChange={handleOnChange}
              testID="member-id-input"
            />
          </FormRow>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <CheckEligibilityButton
            isLoading={isLoading}
            onClick={handleOnSubmit}
          />
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
        opt-out at any time.&nbsp;
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
    }}
  >
    {children}
  </div>
);
