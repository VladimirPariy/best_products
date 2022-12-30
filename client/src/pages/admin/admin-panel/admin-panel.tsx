import React, { FC } from "react";
import { Link } from "react-router-dom";

import ContentContainer from "components/ui/content-container/content-container";

import { appUrl } from "lib/enums/app-urls";

const adminPanelList: { url: string; title: string }[] = [
  { url: appUrl.users_table, title: "Users control" },
  { url: appUrl.products, title: "Products control" },
];

const AdminPanel: FC = () => {
  return (
    <ContentContainer>
      {adminPanelList.map((item) => (
        <Link to={item.url} key={item.url}>
          {item.title}
        </Link>
      ))}
    </ContentContainer>
  );
};

export default AdminPanel;
