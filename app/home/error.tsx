"use client";

import React from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/router";

const ErrorComponent = ({ error }: { error: Error }) => {
  const toast = React.useRef<Toast>(null);

  React.useEffect(() => {
    const handleError = (err: Error) => {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message,
          life: 3000,
        });
      }
    };

    handleError(error);
  }, [error]);

  return (
    <>
      <Toast ref={toast} />
    </>
  );
};

export default ErrorComponent;
