import React, { FC, ReactNode } from "react";
import { Outlet, Navigate, useLocation } from "react-router";

interface Props {
  children?: ReactNode;
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute: FC<Props> = ({
  children,
  isAllowed,
  redirectPath = "/",
}) => {
  const location = useLocation();

  if (!isAllowed)
    return <Navigate to={redirectPath} state={{ from: location }} />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
