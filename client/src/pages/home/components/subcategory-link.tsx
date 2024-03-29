import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "pages/home/components/subcategory-link.module.scss";

import { apiUrls } from "lib/enums/api-urls";
import {
  ICategoryWithSubcategory,
  ISubcategory,
} from "lib/interfaces/categories.interface";

interface Props {
  subcategory: ISubcategory;
  categories: ICategoryWithSubcategory[];
}

const SubcategoryLink: FC<Props> = ({ subcategory, categories }) => {
  const category = categories.find((item) =>
    item.subcategories.includes(subcategory)
  )?.category_title;

  const linkPath = `product/${category}/${subcategory.subcategory_title}`;

  const imgPath = `${apiUrls.BASE_Image_URL}${subcategory.background_image}`;
  return (
    <div key={subcategory.subcategory_id} className={styles.linkContainer}>
      <Link to={linkPath} className={styles.link}>
        <img src={imgPath} alt="subcategory" className={styles.image} />
      </Link>
    </div>
  );
};

export default SubcategoryLink;
