import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useSearchParams} from "react-router-dom";

import styles from "components/ui/filter-panel/filter-panel.module.scss";
import FilterContainer from "components/ui/filter-panel/components/filter-container";

import {useSetParam} from "lib/hooks/use-set-param";
import {
  selectMaxPrice,
  selectMinPrice,
} from "lib/store/products/products-selectors";
import {IParametersDataFromServer} from "lib/interfaces/parameters/parameters.interface";
import productsApi from "lib/api/products-api";
import {selectCategories} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import {upFirstChar} from "lib/utils/up-first-char";

interface Props {
  isShowFilter: boolean;
}

const FilterPanel: FC<Props> = ({isShowFilter}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const categoryPath = pathArray[pathArray.length - 1];
  const categories = useAppSelector(selectCategories);
  const minPriceFromServer = useAppSelector(selectMinPrice);
  const maxPriceFromServer = useAppSelector(selectMaxPrice);
  const [prevCategory, setPrevCategory] = useState("");
  const [productsParameters, setProductsParameters] = useState<
    IParametersDataFromServer[]
  >([]);

  const subcategoryList = categories
  .find((category) => category.category_title === categoryPath)
  ?.subcategories.map((subcategory) => subcategory);

  const [searchParams] = useSearchParams();
  const paramMinPrice = searchParams.get('minPrice')
  const paramMaxPrice = searchParams.get('maxPrice')
  const paramSubcategoryId = searchParams.get('subcategoryId')
  const paramSelectedParameters = searchParams.get('selectedParameters')


  const [subcategoryId, setSubcategoryId] = useState<number>(() => paramSubcategoryId ? +paramSubcategoryId : -1);
  const [minPrice, setMinPrice] = useState<number>(() => paramMinPrice ? +paramMinPrice : 0);
  const [maxPrice, setMaxPrice] = useState<number>(() => paramMaxPrice ? +paramMaxPrice : 0);
  const [selectedParameters, setSelectedParameters] = useState<string[]>(() => paramSelectedParameters ? paramSelectedParameters.split(',') : [])


  useEffect(() => {
    if (minPriceFromServer && (minPriceFromServer > minPrice || minPrice===0)) setMinPrice(minPriceFromServer);
    if (maxPriceFromServer && (maxPriceFromServer < maxPrice || maxPrice === 0)) setMaxPrice(maxPriceFromServer);
  }, [minPriceFromServer, maxPriceFromServer]);

  useEffect(() => {
    const fetchParameters = async () => {
      setProductsParameters(
        await productsApi.getProductsParameters(subcategoryId)
      );
    };
    if (subcategoryId > -1) {
      fetchParameters();
      if (selectedParameters?.length) {
        setSelectedParameters([])
      }
    }
  }, [subcategoryId]);
  useEffect(() => {
    if (categoryPath !== prevCategory && prevCategory) {
      setSubcategoryId(-1);
      setProductsParameters([]);
      setSelectedParameters([])
      setMinPrice(0)
      setMaxPrice(0)
    }
    setPrevCategory(categoryPath);
  }, [categoryPath]);


  const subcategoryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSubcategoryId(+e.target.value);
  };

  const changeCharacteristicHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const duplicate = selectedParameters.find(param => param === e.target.value)
    if (duplicate) {
      setSelectedParameters(prev => prev.filter(param => param !== duplicate))
      return
    }
    setSelectedParameters(prev => [...prev, e.target.value])
  }
  useSetParam(subcategoryId > -1, {subcategoryId})
  useSetParam(minPrice >= minPriceFromServer, {minPrice})
  useSetParam(maxPrice <= maxPriceFromServer, {maxPrice})
  useSetParam(selectedParameters?.length > 0, {selectedParameters})

  return (
    <>
      {isShowFilter && (
        <div className={styles.filterPanelController}>
          <FilterContainer
            className={styles.categoryFilter}
            title={"Categories"}
          >
            <div className={styles.radioContainer}>
              {subcategoryList &&
                subcategoryList.map((subcategory) => (
                  <label
                    key={
                      subcategory.subcategory_id + subcategory.subcategory_title
                    }
                    className={styles.subcategoryTitle}
                  >
                    <input
                      type="radio"
                      value={subcategory.subcategory_id}
                      name="subcategory"
                      checked={subcategory.subcategory_id === subcategoryId}
                      onChange={subcategoryHandler}
                      className={styles.subcategoryRadio}
                    />
                    {subcategory.subcategory_title}
                  </label>
                ))}
            </div>
          </FilterContainer>
          <div className={styles.separator}></div>
          <FilterContainer className={styles.priceFilter} title="Price">
            <div className={styles.inputContainer}>
              <input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
              />
              <div className={styles.separator}></div>
              <input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </div>
          </FilterContainer>
          <div className={styles.separator}></div>

          <div className={styles.characteristicsFilter}>
            {productsParameters?.length > 0 &&
              productsParameters.map((parameters, index) => (
                <React.Fragment
                  key={parameters.parameter_id + parameters.parameter_title}
                >
                  <FilterContainer
                    className={styles.parameterContainer}
                    title={upFirstChar(parameters.parameter_title)}
                  >
                    <div className={styles.charContainer}>
                      {parameters.characteristics.map((char) => (
                        <label
                          key={char.characteristic_id}
                          className={styles.charTitle}
                        >
                          <input
                            checked={!!selectedParameters.find(param => param === `${char.characteristic_id}`)}
                            type="checkbox"
                            value={char.characteristic_id}
                            onChange={changeCharacteristicHandler}
                          />
                          {upFirstChar(char.characteristic_title)}
                        </label>
                      ))}
                    </div>
                  </FilterContainer>
                  {index !== productsParameters.length - 1 && (
                    <div className={styles.separator}></div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
