import React, { FC } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper/FormFieldWrapper";
import "../TextInput/TextInput.css";

type SelectInputProps = {
  label: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  testID?: string;
};

export const SelectInput: FC<SelectInputProps> = ({
  label,
  error,
  onChange,
  testID = "selectinput-input",
}) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        className="ec-input"
        data-testid={testID}
        onChange={onChange}
        style={{
          borderColor: error ? "#FFCD5F" : "#0D4F40",
        }}
      >
        <option></option>
        <option value="1">Provider 1</option>
        <option value="2">Provider 2</option>
        <option value="3">Provider 3</option>
      </select>
    </FormFieldWrapper>
  );
};
