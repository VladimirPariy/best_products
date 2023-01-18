import React, {FC, useEffect, useState} from "react";

import {TabsAdminEnum} from "components/product-detail-tabs/components/tabs-enum";
import {ICharacteristicsWithParameters} from "lib/interfaces/characteristics/characteristic.interface";

import CharacteristicsTab from "components/product-detail-tabs/components/characteristic-tab/characteristics-tab";
import CommentsTab from "components/product-detail-tabs/components/comments-tab/comments-tab";
import DescriptionTab from "components/product-detail-tabs/components/description-tab/description-tab";
import PriceHistoryTab from "components/product-detail-tabs/components/price-history-tab/price-history-tab";
import TabsList from "components/product-detail-tabs/components/tabs-list/tabs-list";
import ContentContainer from "components/ui/content-container/content-container";

import {useAppSelector} from "store/store-types";
import {selectUser} from "store/user/user-selector";

interface Props {
  description: string;
  characteristics: ICharacteristicsWithParameters[];
  comments_amount: number;
  product_id:number;
}

const ProductTabs: FC<Props> = (props) => {
  const {description, comments_amount, characteristics, product_id} = props;
  const [activeTab, setActiveTab] = useState<string>(TabsAdminEnum[0].value);

  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user?.role !== 1) {
      setActiveTab(TabsAdminEnum[0].value)
    }
  }, [user])

  const tabHandler = (tab: string) => {
    setActiveTab(tab);
  };


  return (
    <ContentContainer>
      <TabsList
        activeHandler={tabHandler}
        activeTab={activeTab}
        commentsAmount={comments_amount}
      />
      {activeTab === TabsAdminEnum[0].value &&
				<DescriptionTab description={description}/>}
      {activeTab === TabsAdminEnum[1].value &&
				<CharacteristicsTab characteristics={characteristics}/>}
      {activeTab === TabsAdminEnum[2].value && <CommentsTab product_id={product_id}/>}
      {activeTab === TabsAdminEnum[3].value && <PriceHistoryTab product_id={product_id}/>}
    </ContentContainer>
  );
};

export default ProductTabs;