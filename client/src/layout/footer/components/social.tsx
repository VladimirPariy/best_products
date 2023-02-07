import React, { FC } from "react";

interface Props {
  href: string;
  className: string;
  icon: JSX.Element;
}

const Social: FC<Props> = ({ icon, className, href }) => {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {icon}
    </a>
  );
};

export default Social;
