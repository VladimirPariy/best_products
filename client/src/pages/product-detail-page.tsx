import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { getProductDetailTrigger } from "store/product-detail/product-detail-actions";
import {
  selectProductDetail,
  selectProductDetailStatus,
} from "store/product-detail/product-detail-selector";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";

import ProductDetailLayout from "components/product-detail/product-detail-layout/product-detail-layout";
import ProductTabs from "components/product-detail/product-detail-tabs/product-tabs";
import ProductInfo from "components/product-detail/product-detail-info/product-info";
import { Loader } from "components/ui/loader/loader";

const ProductDetailPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const currentProductId = +location[location.length - 1];
  const dispatch = useAppDispatch();

  const productDetail = useAppSelector(selectProductDetail);
  const isLoading = useAppSelector(selectProductDetailStatus);

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

  useEffect(() => {
    if (isNaN(+location[location.length - 1])) navigate("/404");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductDetailLayout>
      {Object.keys(productDetail).length && !isLoading ? (
        <>
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
        </>
      ) : (
        <Loader color={"#766ed3"} />
      )}
    </ProductDetailLayout>
  );
};

export default ProductDetailPage;
