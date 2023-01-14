import React, { FC } from "react";

interface Props {
  errorText: string | null;
}

const ErrorContainer: FC<Props> = ({ errorText }) => {
  return !!errorText ? <div>{errorText}</div> : null;
};

export default ErrorContainer;
