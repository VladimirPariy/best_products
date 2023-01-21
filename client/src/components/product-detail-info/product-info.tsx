import React, { FC } from "react";

import styles from "components/product-detail-info/product-info.module.scss";

import { ICounters } from "lib/interfaces/products/product.interface";
import { IShotImagesInfo } from "lib/interfaces/products/upload-image.interface";
import { ICharacteristicsWithParameters } from "lib/interfaces/characteristics/characteristic.interface";

import ProductCounters from "components/product-detail-info/components/product-counters";
import ProductInfoWrapper from "components/product-detail-info/components/product-info-wrapper";
import ProductPrice from "components/product-detail-info/components/product-price";
import ProductShotCharacteristics from "components/product-detail-info/components/product-shot-characteristics";
import ProductDetailTitle from "components/product-detail-info/components/product-title";
import ContentContainer from "components/ui/content-container/content-container";
import Slider from "components/ui/slider/slider";

interface Props {
  images: IShotImagesInfo[];
  title: string;
  counters: ICounters;
  price: string;
  characteristics: ICharacteristicsWithParameters[];
}

const ProductInfo: FC<Props> = ({
  images,
  title,
  counters,
  price,
  characteristics,
}) => {
  return (
    <ContentContainer>
      <div className={styles.wrapper}>
        <ProductInfoWrapper>
          <ProductCounters {...counters} />
          <ProductDetailTitle title={title} />
          {characteristics && (
            <ProductShotCharacteristics characteristics={characteristics} />
          )}
          <ProductPrice price={price} />
        </ProductInfoWrapper>
        {images && <Slider images={images} />}
      </div>
    </ContentContainer>
  );
};

export default ProductInfo;
