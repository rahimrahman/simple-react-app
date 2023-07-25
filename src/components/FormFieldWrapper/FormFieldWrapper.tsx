import React, { FC } from "react";
import "./FormFieldWrapper.css";

type FormFieldWrapperProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const FormFieldWrapper: FC<FormFieldWrapperProps> = ({
  label,
  error,
  children,
}) => {
  return (
    <div className="ec-form-field-wrapper">
      <div className="ec-form-field-wrapper-label">{label}</div>

      {children}

      <div className="ec-form-field-wrapper-error">
        {error}
        <span>&nbsp;</span>
      </div>
    </div>
  );
};
