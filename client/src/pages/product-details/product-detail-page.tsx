import React, { FC, useEffect } from "react";
import { useLocation } from "react-router";

import { getProductDetailTrigger } from "store/product-detail/product-detail-actions";
import { selectProductDetail } from "store/product-detail/product-detail-selector";
import { useAppDispatch, useAppSelector } from "store/store-types";

import ProductDetailLayout from "components/product-detail/product-detail-layout/product-detail-layout";
import ProductTabs from "components/product-detail/product-detail-tabs/product-tabs";
import ProductInfo from "components/product-detail/product-detail-info/product-info";

const ProductDetailPage: FC = () => {
  const location = useLocation().pathname.split("/");
  const currentProductId = +location[location.length - 1];
  const dispatch = useAppDispatch();

  const productDetail = useAppSelector(selectProductDetail);

  const {
    positive_feedbacks_amount,
    negative_feedbacks_amount,
    favorites_amount,
    views_amount,
    product_title,
    product_images,
    price,
    characteristics,
    product_description,
    comments_amount,
    product_id,
  } = productDetail;
  useEffect(() => {
    if (!isNaN(+currentProductId))
      dispatch(getProductDetailTrigger(currentProductId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductId]);

  return (
    <ProductDetailLayout>
      <ProductInfo
        images={product_images}
        title={product_title}
        counters={{
          positive_feedbacks_amount,
          negative_feedbacks_amount,
          favorites_amount,
          views_amount,
        }}
        price={price}
        characteristics={characteristics}
      />
      <ProductTabs
        characteristics={characteristics}
        description={product_description}
        comments_amount={comments_amount}
        product_id={product_id}
      />
    </ProductDetailLayout>
  );
};

export default ProductDetailPage;
