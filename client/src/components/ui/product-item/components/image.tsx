import React, { FC } from "react";

import styles from "components/ui/product-item/product-item.module.scss";

import { apiUrls } from "lib/enums/api-urls";
import { IProductImages } from "lib/interfaces/products/upload-image.interface";

interface Props {
  product_images: IProductImages[];
}

const Image: FC<Props> = ({ product_images }) => {
  return (
    <div className={styles.image}>
      <img
        src={`${apiUrls.BASE_Image_URL}${
          product_images.slice().sort((a, b) => a.image_id - b.image_id)[0]
            .image_title
        }`}
        alt="product img"
      />
    </div>
  );
};

export default Image;
