import React, { FC } from "react";

import UserControlBody from "components/user-control/components/user-control-body";
import TableHead from "components/ui/table-head/table-head";
import TableWrapper from "components/ui/table-wrapper/table-wrapper";

const UserControl: FC = () => {
  const head = ["№", "Full name", "Email", "Phone number", "Role", ""];
  return (
    <TableWrapper>
      <TableHead items={head} />
      <UserControlBody />
    </TableWrapper>
  );
};

export default UserControl;
