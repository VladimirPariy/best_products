import React, { FC } from "react";

import UserControlBody from "components/user-control/components/user-control-body";
import UserControlHead from "components/user-control/components/user-control-head";
import UserControlWrapper from "components/user-control/components/user-control-wrapper";

const UserControl: FC = () => {
  return (
    <UserControlWrapper>
      <UserControlHead />
      <UserControlBody />
    </UserControlWrapper>
  );
};

export default UserControl;
