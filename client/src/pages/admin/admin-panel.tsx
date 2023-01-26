import AdminLink from "components/ui/admin-link/admin-link";
import ContentContainer from "components/ui/content-container/content-container";

import { appUrl } from "lib/enums/app-urls";
import React, { FC } from "react";
import {
  AiOutlineBarChart,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";

export interface IAdminLinks {
  url: string;
  title: string;
  icon: JSX.Element;
}

const adminPanelList: IAdminLinks[] = [
  { url: appUrl.users_table, title: "Users control", icon: <AiOutlineUser /> },
  { url: appUrl.new_product, title: "Create product", icon: <AiOutlineEdit /> },
  { url: appUrl.statistics, title: "Statistics", icon: <AiOutlineBarChart /> },
];

const AdminPanel: FC = () => {
  return (
    <ContentContainer>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {adminPanelList.map((item) => (
          <AdminLink key={item.url} item={item} />
        ))}
      </div>
    </ContentContainer>
  );
};

export default AdminPanel;
