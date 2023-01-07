import { AxiosError } from "axios";
import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

import AddProductCharacteristicContainer from "components/ui/add-product-characteristic-container/add-product-characteristic-container";
import AddProductCharacteristicTitle from "components/ui/add-product-characteristic-title/add-product-characteristic-title";
import AddProductImageContainer from "components/ui/add-product-image-container/add-product-image-container";
import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import Button from "components/ui/button/button";
import ContentContainer from "components/ui/content-container/content-container";
import Input from "components/ui/input/input";
import Select from "components/ui/select/select";
import Slider from "components/ui/slider/slider";
import TextArea from "components/ui/text-area/text-area";
import Title from "components/ui/title/title";

import ProductsApi from "lib/api/products-api";
import { IProductDetails } from "lib/interfaces/products/product-details";
import { ICharacteristic } from "lib/interfaces/characteristics/characteristic";
import { UpdatingProductDetails } from "lib/interfaces/products/updating-product-details";
import { selectCategories } from "lib/store/categories/categories-selectors";
import {
  clearProductDetail,
  getProductDetailTrigger,
  removeProductImageTrigger,
  uploadProductImageTrigger,
} from "lib/store/product-detail/product-detail-actions";
import { updateProductAction } from "lib/store/products/products-actions";
import {
  selectProductDetail,
  selectProductImages,
} from "lib/store/product-detail/product-detail-selector";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";

const UpdateProduct: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(selectProductDetail);
  const productImages = useAppSelector(selectProductImages);
  const categories = useAppSelector(selectCategories);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (id) dispatch(getProductDetailTrigger({ id: +id }));

    return function () {
      dispatch(clearProductDetail());
    };
  }, []);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [subcategoryId, setSubcategoryId] = useState<number>(0);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([]);

  useEffect(() => {
    if (Object.keys(productDetails).length > 0) {
      setCategoryId(productDetails.category[0].category_id);
      setSubcategoryId(productDetails.product_subcategory[0].subcategory_id);
      setProductTitle(productDetails.product_title);
      setProductDescription(productDetails.product_description);
      setPrice(productDetails.price);
      setCharacteristics(productDetails.product_characteristics);
    }
  }, [productDetails, categories.length]);

  const addCharacteristic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCharacteristics([
      ...characteristics,
      {
        characteristic_title: "",
        characteristic_description: "",
        product_characteristic_id: Date.now(),
      },
    ]);
  };

  const dropCharacteristic = (id: number) => {
    setCharacteristics(
      characteristics.filter((char) => char.product_characteristic_id !== id)
    );
  };

  const changeCharacteristic = (key: string, value: string, id: number) => {
    setCharacteristics(
      characteristics.map((char) =>
        char.product_characteristic_id === id ? { ...char, [key]: value } : char
      )
    );
  };

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const duplicate = productImages.find((img) => {
        return img.size === file[0].size && img.original_title === file[0].name;
      });
      if (!duplicate && id) {
        const formData = new FormData();
        if (file instanceof FileList) formData.append(`img`, file[0]);
        dispatch(uploadProductImageTrigger({ file: formData, id: +id }));
      }
    }
  };

  const dropFile = async (image_id: number) => {
    dispatch(removeProductImageTrigger({ id: image_id }));
  };

  const updateProduct = async () => {
    if (id) {
      let updatingData: UpdatingProductDetails = { id: +id };
      if (categoryId !== productDetails.category[0].category_id) {
        updatingData = { ...updatingData, category: categoryId };
      }
      if (
        subcategoryId !== productDetails.product_subcategory[0].subcategory_id
      ) {
        updatingData = { ...updatingData, product_subcategory: subcategoryId };
      }
      if (productTitle !== productDetails.product_title) {
        updatingData = { ...updatingData, product_title: productTitle };
      }
      if (productDescription !== productDetails.product_description) {
        updatingData = {
          ...updatingData,
          product_description: productDescription,
        };
      }
      if (price !== productDetails.price) {
        updatingData = { ...updatingData, price };
      }
      if (
        JSON.stringify(characteristics) !==
        JSON.stringify(productDetails.product_characteristics)
      ) {
        updatingData = {
          ...updatingData,
          product_characteristics: JSON.stringify(characteristics),
        };
      }

      try {
        setIsLoading(true);
        await ProductsApi.updateProductDetails(updatingData);
        const { id } = updatingData;
        const updatingProduct: IProductDetails =
          await ProductsApi.getProductDetail(id);

        console.log(updatingProduct);
        dispatch(updateProductAction(updatingProduct));
      } catch (e) {
        if (e instanceof AxiosError) setError(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  console.log(characteristics);

  return (
    <ContentContainer>
      <Title>Update product</Title>
      {categoryId > 0 && subcategoryId > 0 ? (
        <>
          <Select
            labelTitle="Choose category"
            changeHandler={(e) => setCategoryId(+e.target.value)}
            selectDefaultValue={`${categoryId}`}
            selectTitle="Choose category"
          >
            {categories.map((category) => (
              <option value={category.category_id} key={category.category_id}>
                {category.category_title}
              </option>
            ))}
          </Select>

          <Select
            labelTitle="Choose subcategory"
            changeHandler={(e) => setSubcategoryId(+e.target.value)}
            selectDefaultValue={`${subcategoryId}`}
            selectTitle="Choose subcategory"
          >
            {categories[categoryId - 1]?.subcategories.map((subcategory) => (
              <option
                value={subcategory.subcategory_id}
                key={subcategory.subcategory_id}
              >
                {subcategory.subcategory_title}
              </option>
            ))}
          </Select>

          <Input
            labelText="Update product name"
            changeHandler={(e) => setProductTitle(e.target.value)}
            value={productTitle}
            type="text"
          />

          <TextArea
            labelText="Update product description"
            changeHandler={(e) => setProductDescription(e.target.value)}
            value={productDescription}
          />

          <Input
            labelText="Update price"
            changeHandler={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            min={0}
          />

          <Button submitHandler={addCharacteristic} isPurpleButton={false}>
            Add more characteristic
          </Button>

          {characteristics.length > 0 &&
            characteristics.map((char, index) => (
              <div key={char.product_characteristic_id}>
                <AddProductCharacteristicTitle index={index} />
                <AddProductCharacteristicContainer>
                  <Input
                    labelText={"Add characteristic title"}
                    changeHandler={(e) =>
                      changeCharacteristic(
                        "characteristic_title",
                        e.target.value,
                        char.product_characteristic_id
                      )
                    }
                    value={char.characteristic_title}
                  />
                  <Input
                    labelText="Enter characteristic description"
                    changeHandler={(e) =>
                      changeCharacteristic(
                        "characteristic_description",
                        e.target.value,
                        char.product_characteristic_id
                      )
                    }
                    value={char.characteristic_description}
                  />

                  <Button
                    submitHandler={() =>
                      dropCharacteristic(char.product_characteristic_id)
                    }
                    style={{ background: "red" }}
                  >
                    Delete
                  </Button>
                </AddProductCharacteristicContainer>
              </div>
            ))}
          <AddProductImageContainer>
            {productImages && (
              <Slider
                images={productImages}
                deleteHandler={dropFile}
                onDelete={true}
              />
            )}
          </AddProductImageContainer>
          <BtnForAddImage fileHandler={uploadFileHandler}>
            Add images
          </BtnForAddImage>

          <Button submitHandler={updateProduct}>Update product</Button>
        </>
      ) : (
        <div>...Loading</div>
      )}
    </ContentContainer>
  );
};

export default UpdateProduct;
