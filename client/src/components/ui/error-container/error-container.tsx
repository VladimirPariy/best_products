import React, {CSSProperties, FC} from "react";

interface Props {
  errorText: string | null;
  style?:CSSProperties;
}

const ErrorContainer: FC<Props> = ({ errorText, style }) => {
  return !!errorText ? <div style={{...style}}>{errorText}</div> : null;
};

export default ErrorContainer;
