import React from "react";
import { Result } from "./pages/Result/Result";
import { Form } from "./pages/Form/Form";

const App = () => {
  const [isCovered, setIsCovered] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<"form" | "result">("form");

  const handleOnSubmit = (isCovered: boolean) => {
    setIsCovered(isCovered);
    setPage("result");
  };
  return page === "result" ? (
    <Result isCovered={isCovered} />
  ) : (
    <Form onSubmit={handleOnSubmit} />
  );
};

export default App;
