import React, { ChangeEvent, FC } from "react";

import styles from "components/filter-panel/components/radio-input.module.scss";

import {
  ICategoryWithSubcategory,
  ISubcategory,
} from "lib/interfaces/categories.interface";
import { NavLink } from "react-router-dom";

interface Props {
  subcategory: ISubcategory;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  subcategoryId: number;
  categories: ICategoryWithSubcategory[];
  isLink?: boolean;
}

const RadioInput: FC<Props> = ({
  subcategory,
  subcategoryId,
  changeHandler,
  categories,
  isLink,
}) => {
  const category = categories.find(
    (category) => category.category_id === subcategory.category
  );
  return isLink ? (
    <NavLink
      to={`/product/${category?.category_title}/${subcategory.subcategory_title}`}
    >
      <label className={styles.subcategoryTitle}>
        <input
          type="radio"
          value={subcategory.subcategory_id}
          name="subcategory"
          checked={subcategory.subcategory_id === subcategoryId}
          onChange={changeHandler}
          className={styles.subcategoryRadio}
        />
        {subcategory.subcategory_title}
      </label>
    </NavLink>
  ) : (
    <label className={styles.subcategoryTitle}>
      <input
        type="radio"
        value={subcategory.subcategory_id}
        name="subcategory"
        checked={subcategory.subcategory_id === subcategoryId}
        onChange={changeHandler}
        className={styles.subcategoryRadio}
      />
      {subcategory.subcategory_title}
    </label>
  );
};

export default RadioInput;
