import React, {FC, useEffect} from "react";

import FavoriteProductList from "components/favorite-product-list/favorite-product-list";
import {getFavoriteProductsTrigger} from "store/favorite-products/favorite-products-actions";
import {selectFavoriteProducts} from "store/favorite-products/favorite-products-selectors";
import {useAppDispatch, useAppSelector} from "store/store-types";
import {selectUser} from "store/user/user-selector";

const FavoritePage: FC = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const favoriteProduct = useAppSelector(selectFavoriteProducts)

  useEffect(() => {
    if(user?.user_id){
      dispatch(getFavoriteProductsTrigger(user.user_id))
    }
  }, [])

  return (
    <section>
      {Object.keys(user).length > 0
        ? <FavoriteProductList products={favoriteProduct}/>
        : <div>Войти</div>
      }
    </section>
  );
};

export default FavoritePage;
