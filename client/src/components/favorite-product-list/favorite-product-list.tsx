import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EmptyFavorite from "components/ui/empty-favorite/empty-favorite";
import ProductItem from "components/ui/product-item/product-item";
import ProductListWrapper from "components/ui/product-list-wrapper/product-list-wrapper";

import { IProduct } from "lib/interfaces/products/product.interface";

interface Props {
  products: IProduct[];
}

const FavoriteProductList: FC<Props> = ({ products }) => {
  const [filter] = useSearchParams();
  const order = filter.get("orderBy");
  const subcategory = filter.get("subcategoryId");
  const minPrice = filter.get("minPrice");
  const maxPrice = filter.get("maxPrice");
  const selectedCharacteristic = filter.get("selectedParameters");

  const [sortedProduct, setSortedProduct] = useState(products);
  const [filteredProduct, setFilteredProduct] = useState(sortedProduct);

  useEffect(() => {
    setSortedProduct(products);
  }, [products]);

  useEffect(() => {
    if (sortedProduct.length > 0) {
      if (order === "asc") {
        setSortedProduct(
          sortedProduct.slice().sort((a, b) => +a.price - +b.price)
        );
      } else if (order === "desc") {
        setSortedProduct(
          sortedProduct.slice().sort((a, b) => +b.price - +a.price)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sortedProduct.length]);

  useEffect(() => {
    let temp = [...sortedProduct];
    if (subcategory) {
      temp = temp.filter(
        (item) => item.subcategories[0].subcategory_id === +subcategory
      );
    }
    if (minPrice) {
      temp = temp.filter((item) => +item.price >= +minPrice);
    }
    if (maxPrice) {
      temp = temp.filter((item) => +item.price <= +maxPrice);
    }
    if (selectedCharacteristic) {
      const char = selectedCharacteristic.split(",");
      temp = temp.filter((item) =>
        item.characteristics.some((el) =>
          char.includes(`${el.characteristic_id}`)
        )
      );
    }
    setFilteredProduct(temp);
  }, [sortedProduct, subcategory, minPrice, maxPrice, selectedCharacteristic]);

  return (
    <ProductListWrapper>
      {filteredProduct.length ? (
        filteredProduct.map((item) => (
          <ProductItem {...item} key={item.product_id} />
        ))
      ) : (
        <EmptyFavorite />
      )}
    </ProductListWrapper>
  );
};

export default FavoriteProductList;
