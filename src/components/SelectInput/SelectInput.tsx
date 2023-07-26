import React, { FC } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper/FormFieldWrapper";
import Select from "react-select";
import "../TextInput/TextInput.css";

type SelectInputProps = {
  label: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  testID?: string;
  options?: { value: string; label: string }[];
};

const OPTIONS = [
  { value: "BCBS-CO", label: "Blue Cross Blue Shields 32" },
  { value: "BCBS-NE", label: "Blue Cross Blue Shields Nebraska" },
  { value: "Anthem", label: "Anthem" },
  { value: "Aetna", label: "Aetna" },
  { value: "Cigna", label: "Cigna" },
  { value: "Humana", label: "Humana" },
  { value: "Kaiser", label: "Kaiser" },
  { value: "United", label: "United" },
  { value: "Other", label: "Other" },
];

export const SelectInput: FC<SelectInputProps> = ({
  label,
  error,
  onChange,
  options = OPTIONS,
  testID = "selectinput-input",
}) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <div data-testid={testID}>
        <Select
          placeholder="Type or select"
          data-testid={testID}
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: error ? "#FFCD5F" : "#0D4F40",
              borderRadius: "8px",
              borderWidth: "1px",
              height: "50px",
              fontSize: "18px",
            }),
            option: (base) => ({
              ...base,
              fontSize: "18px",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 99999,
            }),
          }}
          onChange={(newValue) => {
            onChange({
              target: {
                value: newValue!.value,
              },
            } as any);
          }}
        />
      </div>
    </FormFieldWrapper>
  );
};
