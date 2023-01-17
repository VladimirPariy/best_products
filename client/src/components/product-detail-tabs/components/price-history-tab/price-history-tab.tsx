import React, {FC} from "react";

import styles from "components/product-detail-tabs/components/price-history-tab/price-history-tab.module.scss"


import {IShotPriceHistory} from "lib/interfaces/price-history/price-history.interface";

interface Props {
  priceHistory: IShotPriceHistory[]
}

const PriceHistoryTab: FC<Props> = ({priceHistory}) => {
  return (
    <div>
      price history tab
    </div>
  );
};

export default PriceHistoryTab;