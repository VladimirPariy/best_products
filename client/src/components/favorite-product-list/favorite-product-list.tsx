import ProductItem from "components/product-item/product-item";
import ProductListWrapper from "components/ui/product-list-wrapper/product-list-wrapper";
import {IProduct} from "lib/interfaces/products/product.interface";
import React, {FC} from "react";

interface Props {
  products: IProduct[]
}

const FavoriteProductList: FC<Props> = ({products}) => {

  return (
    <ProductListWrapper>
      {
        products.map(item => (
          <ProductItem {...item} key={item.product_id}/>
        ))
      }
    </ProductListWrapper>
  );
};

export default FavoriteProductList;