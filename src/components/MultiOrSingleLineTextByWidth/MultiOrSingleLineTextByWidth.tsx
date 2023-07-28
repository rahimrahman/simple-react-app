import React, { FC } from "react";

type MultiOrSingleLineTextByWidthProps = {
  text: string[];
  width: number;
};

export const MultiOrSingleLineTextByWidth: FC<
  MultiOrSingleLineTextByWidthProps
> = ({ text, width = 800 }) => {
  if (width > 768) {
    return (
      <>
        {text.map((t, index) => (
          <div key={index}>{t}</div>
        ))}
      </>
    );
  }
  return <>{text.join(" ")}</>;
};
