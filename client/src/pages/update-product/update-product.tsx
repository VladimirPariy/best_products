import ContentContainer from "components/ui/content-container/content-container";
import Select from "components/ui/select/select";
import Title from "components/ui/title/title";
import {categoriesSelector} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import React, {FC, useState} from "react";

interface Props {
}

const UpdateProduct: FC<Props> = (props) => {


  return (
    <ContentContainer>
      <Title>Update product</Title>
      {/*<Select labelTitle='Choose category'*/}
      {/*        changeHandler={(e) => setCategoryId(+e.target.value)}*/}
      {/*        selectDefaultValue='0'*/}
      {/*        selectTitle='Choose category'>*/}
      {/*  {categories.map((category) => (*/}
      {/*    <option value={category.category_id}*/}
      {/*            key={category.category_id}>*/}
      {/*      {category.category_title}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</Select>*/}
    </ContentContainer>
  );
};

export default UpdateProduct;