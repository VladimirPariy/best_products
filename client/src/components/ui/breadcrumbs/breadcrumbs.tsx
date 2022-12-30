import React, { FC } from "react";
import { useLocation } from "react-router";

interface Props {}

const Breadcrumbs: FC<Props> = (props) => {
  const location = useLocation();

  const crumbs = location.pathname.split("/");

  return (
    <ol>
      {crumbs.map((crumb, index) => {
        if (index === 0) {
          return <span key={index}></span>;
        }
        if (index === crumbs.length - 1) {
          return <span key={index}>{crumb}</span>;
        }

        return <span key={index}>{crumb} &gt; </span>;
      })}
    </ol>
  );
};

export default Breadcrumbs;
