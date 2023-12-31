import React, { FC } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper/FormFieldWrapper";
import "./TextInput.css";

type TextInputProps = {
  name?: string;
  label: string;
  type?: "text" | "date";
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testID?: string;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  onChange,
  error,
  testID = "textinput-input",
}) => {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        className="ec-input"
        data-testid={testID}
        name={name}
        type={type}
        style={{
          borderColor: error ? "#FFCD5F" : "#0D4F40",
        }}
        onChange={onChange}
      />
    </FormFieldWrapper>
  );
};
