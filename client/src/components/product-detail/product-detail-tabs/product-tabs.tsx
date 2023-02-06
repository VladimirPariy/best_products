import React, { FC, useEffect, useState } from "react";

import { Tabs } from "components/product-detail/product-detail-tabs/components/tabs-enum";
import { ICharacteristicsWithParameters } from "lib/interfaces/characteristic.interface";

import CharacteristicsTab from "components/product-detail/product-detail-tabs/components/characteristic-tab/characteristics-tab";
import CommentsTab from "components/product-detail/product-detail-tabs/components/comments-tab/comments-tab";
import DescriptionTab from "components/product-detail/product-detail-tabs/components/description-tab/description-tab";
import PriceHistoryTab from "components/product-detail/product-detail-tabs/components/price-history-tab/price-history-tab";
import TabsList from "components/product-detail/product-detail-tabs/components/tabs-list/tabs-list";
import ContentContainer from "components/ui/content-container/content-container";

import { useAppSelector } from "lib/interfaces/store.types";
import { selectUser } from "store/user/user-selector";

interface Props {
  description: string;
  characteristics: ICharacteristicsWithParameters[];
  comments_amount: number;
  product_id: number;
}

const ProductTabs: FC<Props> = (props) => {
  const { description, comments_amount, characteristics, product_id } = props;
  const [activeTab, setActiveTab] = useState<string>(Tabs.Description);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user?.role !== 1) {
      setActiveTab(Tabs.Description);
    }
  }, [user]);

  const tabHandler = (tab: string) => {
    setActiveTab(tab);
  };

  let currentTab: JSX.Element | null = null;

  switch (activeTab) {
    case Tabs.Description:
      currentTab = <DescriptionTab description={description} />;
      break;
    case Tabs.Characteristics:
      currentTab = <CharacteristicsTab characteristics={characteristics} />;
      break;
    case Tabs.Comments:
      currentTab = <CommentsTab product_id={product_id} />;
      break;
    case Tabs.PriceDynamics:
      currentTab = <PriceHistoryTab product_id={product_id} />;
      break;
  }

  return (
    <ContentContainer>
      <TabsList
        activeHandler={tabHandler}
        activeTab={activeTab}
        commentsAmount={comments_amount}
      />
      {currentTab}
    </ContentContainer>
  );
};

export default ProductTabs;
