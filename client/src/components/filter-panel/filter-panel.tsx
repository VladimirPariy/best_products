import CharacteristicInput from "components/filter-panel/components/characteristic-input";
import PriceInput from "components/filter-panel/components/price-input";
import RadioInput from "components/filter-panel/components/radio-input";
import Separator from "components/filter-panel/components/separator";
import { ISubcategory } from "lib/interfaces/categories/categories.interface";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

import styles from "components/filter-panel/filter-panel.module.scss";
import FilterContainer from "components/filter-panel/components/filter-container";

import { useSetParam } from "lib/hooks/use-set-param";
import {
  selectMaxPrice,
  selectMinPrice,
} from "store/products/products-selectors";
import { IParametersDataFromServer } from "lib/interfaces/parameters/parameters.interface";
import productsApi from "lib/api/products-api";
import { selectCategories } from "store/categories/categories-selectors";
import { useAppSelector } from "store/store-types";
import { upFirstChar } from "lib/utils/up-first-char";

interface Props {
  isShowFilter: boolean;
}

const FilterPanel: FC<Props> = ({ isShowFilter }) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const categoryPath = pathArray[2];
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

  const currentSubcategory: ISubcategory | undefined =
    pathArray?.length > 3
      ? subcategoryList?.find(
          (subcategory) => subcategory.subcategory_title === pathArray[3]
        )
      : undefined;
  const [searchParams] = useSearchParams();
  const paramMinPrice = searchParams.get("minPrice");
  const paramMaxPrice = searchParams.get("maxPrice");
  const paramSubcategoryId =
    searchParams.get("subcategoryId") ||
    (currentSubcategory && +currentSubcategory?.subcategory_id);
  const paramSelectedParameters = searchParams.get("selectedParameters");

  const [subcategoryId, setSubcategoryId] = useState<number>(
    paramSubcategoryId ? +paramSubcategoryId : -1
  );
  const [minPrice, setMinPrice] = useState<number>(() =>
    paramMinPrice ? +paramMinPrice : 0
  );
  const [maxPrice, setMaxPrice] = useState<number>(() =>
    paramMaxPrice ? +paramMaxPrice : 0
  );
  const [selectedParameters, setSelectedParameters] = useState<string[]>(() =>
    paramSelectedParameters ? paramSelectedParameters.split(",") : []
  );

  useEffect(() => {
    if (paramSubcategoryId) {
      setSubcategoryId(+paramSubcategoryId);
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setSubcategoryId(-1);
      setProductsParameters([]);
      setSelectedParameters([]);
      setMinPrice(0);
      setMaxPrice(0);
    }
  }, [paramSubcategoryId]);

  useEffect(() => {
    if (minPriceFromServer && (minPriceFromServer > minPrice || minPrice === 0))
      setMinPrice(minPriceFromServer);
    if (maxPriceFromServer && (maxPriceFromServer < maxPrice || maxPrice === 0))
      setMaxPrice(maxPriceFromServer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setSelectedParameters([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcategoryId]);

  useEffect(() => {
    if (categoryPath !== prevCategory && prevCategory && !paramSubcategoryId) {
      setSubcategoryId(-1);
      setProductsParameters([]);
      setSelectedParameters([]);
      setMinPrice(0);
      setMaxPrice(0);
    }
    setPrevCategory(categoryPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryPath]);

  const changeCharacteristicHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const duplicate = selectedParameters.find(
      (param) => param === e.target.value
    );
    if (duplicate) {
      setSelectedParameters((prev) =>
        prev.filter((param) => param !== duplicate)
      );
      return;
    }
    setSelectedParameters((prev) => [...prev, e.target.value]);
  };
  useSetParam(minPrice > minPriceFromServer, { minPrice });
  useSetParam(maxPrice < maxPriceFromServer, { maxPrice });
  useSetParam(selectedParameters?.length > 0, { selectedParameters });

  return (
    <>
      {isShowFilter && (
        <div className={styles.filterPanelController}>
          {subcategoryList && (
            <>
              <FilterContainer
                className={styles.categoryFilter}
                title={"Categories"}
              >
                <div className={styles.radioContainer}>
                  {subcategoryList.map((subcategory) => (
                    <RadioInput
                      categories={categories}
                      subcategory={subcategory}
                      changeHandler={(e) => setSubcategoryId(+e.target.value)}
                      subcategoryId={subcategoryId}
                      key={
                        subcategory.subcategory_id +
                        subcategory.subcategory_title
                      }
                    />
                  ))}
                </div>
              </FilterContainer>
              <Separator />
            </>
          )}
          <FilterContainer className={styles.priceFilter} title="Price">
            <div className={styles.inputContainer}>
              <PriceInput
                value={minPrice}
                changeHandler={(e) => setMinPrice(+e.target.value)}
                title="minPrice"
              />
              <Separator />
              <PriceInput
                value={maxPrice}
                changeHandler={(e) => setMaxPrice(+e.target.value)}
                title="maxPrice"
              />
            </div>
          </FilterContainer>
          <Separator />
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
                        <CharacteristicInput
                          char={char}
                          key={char.characteristic_id}
                          changeHandler={changeCharacteristicHandler}
                          selectedParameters={selectedParameters}
                        />
                      ))}
                    </div>
                  </FilterContainer>
                  {index !== productsParameters.length - 1 && <Separator />}
                </React.Fragment>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
