import React, {FC} from "react";

import styles from "components/product-detail-tabs/components/description-tab/description-tab.module.scss"

interface Props {
  description: string
}

const DescriptionTab: FC<Props> = ({description}) => {
  return (
    <div className={styles.descriptionTab}>
      {description}
    </div>
  );
};

export default DescriptionTab;