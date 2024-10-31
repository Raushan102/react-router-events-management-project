import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const errorResponse = useRouteError();

  let title = "An error occurred";

  if (errorResponse.status === 500) {
    title = errorResponse.data.message;
  }
  if (errorResponse.status === 422) {
    title = "invalid path source or path not found";
  }

  return (
    <>
      <h2>{title}</h2>;<p>{errorResponse.status}</p>
    </>
  );
}

export default ErrorPage;
