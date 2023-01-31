import React, { FC } from "react";

import Statistics from "components/statistics/statistics";
import ContentContainer from "components/ui/content-container/content-container";
import Title from "components/ui/title/title";

const StatisticsPage: FC = () => {
  return (
    <ContentContainer>
      <Title>Statistics</Title>
      <Statistics />
    </ContentContainer>
  );
};

export default StatisticsPage;
