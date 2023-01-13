import React, { FC, useEffect } from "react";
import { useLocation } from "react-router";
import { getProductDetailTrigger } from "store/product-detail/product-detail-actions";
import { useAppDispatch } from "store/store-types";

const ProductDetailPage: FC = () => {
  const location = useLocation().pathname.split("/");
  const currentProductId = +location[location.length - 1];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetailTrigger(currentProductId));
  }, []);

  return <div>Product details</div>;
};

export default ProductDetailPage;
