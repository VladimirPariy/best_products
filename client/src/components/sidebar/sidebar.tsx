import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { NavLink } from "react-router-dom";

import Arrow from "assets/icon/general/arrow";
import styles from "components/sidebar/sidebar.module.scss";
import CarIcon from "assets/icon/sidebar/car";
import ClothingIcon from "assets/icon/sidebar/clothing";
import ElectronicsIcon from "assets/icon/sidebar/electronics";

import SidebarItem from "components/sidebar/components/sidebar-item";
import { sidebarList } from "components/sidebar/sidebar.data";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";
import { categoriesTrigger } from "lib/store/categories/categories-actions";
import { ISidebarList } from "lib/interfaces/sidebar/sidebar.interface";
import { selectCategories } from "lib/store/categories/categories-selectors";

interface Props {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<Props> = ({ setCheckedBurgerMenu }) => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [onHover, setOnHover] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [sidebarCategories, setSidebarCategories] = useState<ISidebarList[]>(
    []
  );
  const [isOpenSubcategory, setIsOpenSubcategory] = useState(false);
  const [sidebarSubcategories, setSidebarSubcategories] = useState<
    ISidebarList[]
  >([]);

  useEffect(() => {
    if (!onHover) {
      setIsOpenCategory(false);
      setIsOpenSubcategory(false);
    }
  }, [onHover]);

  const categoryClickHandler = (
    e: MouseEvent<HTMLAnchorElement>,
    item: ISidebarList
  ) => {
    if (item.title === "Categories") {
      e.preventDefault();
      setIsOpenCategory((prev) => !prev);
      setIsOpenSubcategory(false);
      return;
    }
    setCheckedBurgerMenu && setCheckedBurgerMenu(false);
  };

  const subcategoryClickHandler = (
    e: MouseEvent<HTMLAnchorElement>,
    item: ISidebarList
  ) => {
    e.preventDefault();
    setIsOpenSubcategory(true);
    const category = categories.find(
      (category) => category.category_title === item.title
    );
    if (category) {
      const subcategory: ISidebarList[] = category.subcategories.map(
        (subcategory, index) => {
          const { subcategory_title } = subcategory;
          return {
            title: subcategory_title,
            url: `product/${category.category_title}/${subcategory_title}`,
            id: index + 1,
          };
        }
      );

      subcategory.unshift({
        title: `${subcategory[0].title}, ${subcategory[1].title}, ${subcategory[3].title}`,
        id: 0,
        url: `product/${category.category_title}`,
      });
      setSidebarSubcategories(subcategory);
    }
  };

  const onHoveredWrapper = getClassNameByCondition(
    styles,
    "sidebarWrapper",
    "hoveredSidebarWrapper",
    onHover
  );

  useEffect(() => {
    dispatch(categoriesTrigger());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setSidebarCategories(
        categories.map((category) => {
          if (category.category_title === "Electronics") {
            return {
              icon: <ElectronicsIcon />,
              title: category.category_title,
              url: `product/${category.category_title}`,
              id: category.category_id,
            };
          } else if (category.category_title === "Car") {
            return {
              icon: <CarIcon />,
              title: category.category_title,
              url: `/product/${category.category_title}`,
              id: category.category_id,
            };
          } else {
            return {
              icon: <ClothingIcon />,
              title: category.category_title,
              url: `product/${category.category_title}`,
              id: category.category_id,
            };
          }
        })
      );
    }
  }, [categories]);
  return (
    <aside>
      <nav
        className={onHoveredWrapper}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <ul>
          {sidebarList.map((item) => (
            <SidebarItem
              onHover={onHover}
              item={item}
              key={item.id}
              clickHandler={categoryClickHandler}
            />
          ))}
        </ul>
        <div className={styles.extraCategory}>
          {isOpenCategory && (
            <ul style={{ marginLeft: "15px" }}>
              {sidebarCategories.map((category) => (
                <SidebarItem
                  onHover={onHover}
                  item={category}
                  key={category.id}
                  clickHandler={subcategoryClickHandler}
                />
              ))}
            </ul>
          )}
          {sidebarSubcategories && isOpenSubcategory && (
            <ul className={styles.subcategoryList}>
              {sidebarSubcategories.map((subcategory) => (
                <li
                  key={subcategory.id}
                  className={styles.subcategoryItem}
                  onClick={() =>
                    setCheckedBurgerMenu && setCheckedBurgerMenu(false)
                  }
                >
                  <NavLink
                    to={subcategory.url}
                    className={({ isActive }) =>
                      isActive ? styles.active : null
                    }
                  >
                    <div>
                      {subcategory.title}
                      <span>{subcategory.id === 0 ? <Arrow /> : false}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
