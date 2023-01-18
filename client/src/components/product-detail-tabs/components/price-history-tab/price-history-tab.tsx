import React, {FC} from "react";

import styles from "components/product-detail-tabs/components/price-history-tab/price-history-tab.module.scss"

interface Props{
  product_id:number
}


const PriceHistoryTab: FC<Props> = ({product_id}) => {
  return (
    <div>
      price history tab
    </div>
  );
};

export default PriceHistoryTab;