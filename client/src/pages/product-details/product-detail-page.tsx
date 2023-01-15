import React, {FC, useEffect} from "react";
import {useLocation} from "react-router";

import {getProductDetailTrigger} from "store/product-detail/product-detail-actions";
import {selectProductDetail} from "store/product-detail/product-detail-selector";
import {useAppDispatch, useAppSelector} from "store/store-types";

import ProductInfo from "components/product-info/product-info";


const ProductDetailPage: FC = () => {
  const location = useLocation().pathname.split("/");
  const currentProductId = +location[location.length - 1];
  const dispatch = useAppDispatch();

  const productDetail = useAppSelector(selectProductDetail);

  const {
    positive_feedbacks,
    negative_feedbacks,
    number_of_favorites,
    number_of_views,
    product_title,
    product_images,
    price,
    characteristics
  } = productDetail;

  useEffect(() => {
    dispatch(getProductDetailTrigger(currentProductId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProductInfo
        images={product_images}
        title={product_title}
        counters={{positive_feedbacks, negative_feedbacks, number_of_favorites, number_of_views}}
        price={price}
        characteristics={characteristics}
      />
    </>
  );
};

export default ProductDetailPage;
