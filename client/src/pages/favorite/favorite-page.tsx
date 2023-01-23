import React, { FC } from "react";

import NotLogged from "components/ui/not-logged/not-logged";
import FavoriteProductList from "components/favorite-product-list/favorite-product-list";

import { selectFavoriteProducts } from "store/favorite-products/favorite-products-selectors";
import { useAppSelector } from "store/store-types";
import { selectUser } from "store/user/user-selector";

const FavoritePage: FC = () => {
  const favoriteProduct = useAppSelector(selectFavoriteProducts);
  const user = useAppSelector(selectUser);

  return (
    <section>
      {Object.keys(user).length > 0 ? (
        <FavoriteProductList products={favoriteProduct} />
      ) : (
        <NotLogged />
      )}
    </section>
  );
};

export default FavoritePage;
