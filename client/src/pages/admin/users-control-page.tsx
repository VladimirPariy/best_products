import React, { FC } from "react";

import ContentContainer from "components/ui/content-container/content-container";
import Title from "components/ui/title/title";
import UsersControl from "components/user-control/user-control";

const UsersControlPage: FC = () => {
  return (
    <ContentContainer>
      <Title>Users control</Title>
      <UsersControl />
    </ContentContainer>
  );
};

export default UsersControlPage;
