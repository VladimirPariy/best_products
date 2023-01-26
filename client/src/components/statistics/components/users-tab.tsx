import React, { FC } from "react";

import UserTableBody from "components/statistics/components/user-table-body";
import TableHead from "components/ui/table-head/table-head";
import TableWrapper from "components/ui/table-wrapper/table-wrapper";
import { selectStatisticUsers } from "store/statistics/statistics-selectors";
import { useAppSelector } from "store/store-types";

const UsersTab: FC = () => {
  const head = ["№", "Full name", "Email", "Phone", "Registration date"];

  const users = useAppSelector(selectStatisticUsers);

  return (
    <TableWrapper>
      <TableHead items={head} />
      <UserTableBody item={users} />
    </TableWrapper>
  );
};

export default UsersTab;
