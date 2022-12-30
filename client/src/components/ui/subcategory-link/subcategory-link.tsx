import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "components/ui/subcategory-link/subcategory-link.module.scss";

import { apiUrls } from "lib/enums/api-urls";
import {
  ICategoryWithSubcategory,
  ISubcategory,
} from "lib/interfaces/categories/categories.interface";

interface Props {
  subcategory: ISubcategory;
  categories: ICategoryWithSubcategory[];
}

const SubcategoryLink: FC<Props> = ({ subcategory, categories }) => {
  const category = categories
    .find((item) => item.subcategories.includes(subcategory))
    ?.category_title?.toLowerCase();
  return (
    <div key={subcategory.subcategory_id} className={styles.linkContainer}>
      <Link
        to={`product/${category}/${subcategory.subcategory_title.toLowerCase()}`}
        className={styles.link}
      >
        <img
          src={`${apiUrls.BASE_Image_URL}${subcategory.background_image}`}
          alt="subcategory"
          className={styles.image}
        />
      </Link>
    </div>
  );
};

export default SubcategoryLink;
