import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import ErrorContainer from "components/ui/error-container/error-container";
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

import { ValidationMessage } from "lib/enums/validation-message";
import { ErrorValidationInterface } from "lib/interfaces/error-validation.interface";
import { useAllParameters } from "lib/hooks/use-all-parameters";
import { ITempChar } from "lib/interfaces/products/creating-product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import { upFirstChar } from "lib/utils/up-first-char";

import { selectCategories } from "store/categories/categories-selectors";
import {
  removeProductImageTrigger,
  updateProductTrigger,
  uploadProductImageTrigger,
} from "store/product-control/product-control-actions";
import { selectProductControlSuccess } from "store/product-control/product-control-selectors";
import {
  clearProductDetail,
  getProductDetailTrigger,
} from "store/product-detail/product-detail-actions";
import {
  selectProductDetail,
  selectProductImages,
} from "store/product-detail/product-detail-selector";
import { useAppDispatch, useAppSelector } from "store/store-types";

const UpdateProduct: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(selectProductDetail);
  const productImages = useAppSelector(selectProductImages);
  const categories = useAppSelector(selectCategories);
  const { allCharacteristics, allParameters } = useAllParameters();
  const navigate = useNavigate();
  const success = useAppSelector(selectProductControlSuccess);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [subcategoryId, setSubcategoryId] = useState<number>(0);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [characteristics, setCharacteristics] = useState<ITempChar[]>([]);

  const [errorProductTitle, setErrorProductTitle] =
    useState<ErrorValidationInterface>(null);
  const [errorDescription, setErrorDescription] =
    useState<ErrorValidationInterface>(null);
  const [errorPrice, setErrorPrice] = useState<ErrorValidationInterface>(null);
  const [errorCharacteristic, setErrorCharacteristic] =
    useState<ErrorValidationInterface>(null);
  const [errorUploadImages, setErrorUploadImages] =
    useState<ErrorValidationInterface>(null);

  useEffect(() => {
    if (id) dispatch(getProductDetailTrigger(+id));

    return () => {
      dispatch(clearProductDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(productDetails).length > 0) {
      setCategoryId(productDetails.subcategories[0].categories.category_id);
      setSubcategoryId(productDetails.subcategories[0].subcategory_id);
      setProductTitle(productDetails.product_title);
      setProductDescription(productDetails.product_description);
      setPrice(productDetails.price);
      setCharacteristics(
        productDetails.characteristics.map((item) => {
          return {
            parameter: item.parameters.parameter_id,
            characteristic: item.characteristic_id,
            id: item.characteristic_id,
          };
        })
      );
    }
  }, [
    productDetails.subcategories,
    productDetails.product_title,
    productDetails.product_description,
    productDetails.price,
    productDetails.characteristics,
    categories.length,
  ]);

  const addCharacteristic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCharacteristics([
      ...characteristics,
      {
        parameter: 0,
        characteristic: 0,
        id: Date.now(),
      },
    ]);
  };

  const dropCharacteristic = (id: number) => {
    setCharacteristics(characteristics.filter((char) => char.id !== id));
  };

  const changeCharacteristic = (key: string, value: string, id: number) => {
    setCharacteristics(
      characteristics.map((char) =>
        char.id === id ? { ...char, [key]: value } : char
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

  useEffect(() => {
    if (success) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (errorProductTitle && productTitle.length > 0) {
      setErrorProductTitle(null);
    }
    if (errorDescription && productDescription.length > 0) {
      setErrorDescription(null);
    }
    if (errorPrice && price.length > 0) {
      setErrorPrice(null);
    }
    if (errorCharacteristic && characteristics.length !== 0) {
      setErrorCharacteristic(null);
    }

    if (errorUploadImages && productDetails.product_images.length !== 0) {
      setErrorUploadImages(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productTitle,
    price,
    productDescription,
    characteristics,
    productDetails.product_images,
  ]);

  const updateProduct = async () => {
    if (!productTitle) {
      setErrorProductTitle(ValidationMessage.required);
    }
    if (!price) {
      setErrorPrice(ValidationMessage.required);
    }
    if (!productDescription) {
      setErrorDescription(ValidationMessage.required);
    }
    if (characteristics.length === 0) {
      setErrorCharacteristic(ValidationMessage.invalidCharacteristics);
    }
    if (productDetails.product_images.length === 0) {
      setErrorUploadImages(ValidationMessage.invalidImages);
    }
    if (
      !productTitle ||
      !price ||
      !productDescription ||
      characteristics.length === 0 ||
      productDetails.product_images.length === 0
    ) {
      return;
    }

    if (id) {
      let updatingData: UpdatingProductDetailsInterface = { id: +id };
      if (
        categoryId !== productDetails.subcategories[0].categories.category_id
      ) {
        updatingData = { ...updatingData, category: categoryId };
      }
      if (subcategoryId !== productDetails.subcategories[0].subcategory_id) {
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
        JSON.stringify(
          productDetails.characteristics.map((item) => {
            return {
              parameter: item.parameter,
              characteristic: item.characteristic_id,
              id: item.characteristic_id,
            };
          })
        )
      ) {
        updatingData = {
          ...updatingData,
          product_characteristics: JSON.stringify(
            characteristics.map((item) => item.characteristic)
          ),
        };
      }

      if (Object.keys(updatingData).length === 1) return;
      dispatch(updateProductTrigger(updatingData));
    }
  };
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
            {categories.map((category, index) => (
              <option value={category.category_id} key={index}>
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
            {categories[categoryId - 1]?.subcategories.map(
              (subcategory, index) => (
                <option value={subcategory.subcategory_id} key={index}>
                  {subcategory.subcategory_title}
                </option>
              )
            )}
          </Select>

          <Input
            labelText="Update product name"
            changeHandler={(e) => setProductTitle(e.target.value)}
            value={productTitle}
            type="text"
            isError={!!errorProductTitle}
            children={<ErrorContainer errorText={errorProductTitle} />}
          />

          <TextArea
            labelText="Update product description"
            changeHandler={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            isError={!!errorDescription}
            children={<ErrorContainer errorText={errorDescription} />}
          />

          <Input
            labelText="Update price"
            changeHandler={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            min={0}
            isError={!!errorPrice}
            children={<ErrorContainer errorText={errorPrice} />}
          />

          <Button
            submitHandler={addCharacteristic}
            isPurpleButton={false}
            errorNode={<ErrorContainer errorText={errorCharacteristic} />}
          >
            Add more characteristic
          </Button>

          {characteristics.length > 0 &&
            characteristics.map((char, index) => (
              <div key={index}>
                <AddProductCharacteristicTitle index={index} />
                <AddProductCharacteristicContainer>
                  <Select
                    labelTitle="Enter parameter"
                    changeHandler={(e) =>
                      changeCharacteristic("parameter", e.target.value, char.id)
                    }
                    selectDefaultValue={`${char.parameter}`}
                    selectTitle="Enter parameter"
                  >
                    {allParameters
                      .filter((item) => item.subcategory === subcategoryId)
                      .map((item, index) => (
                        <option value={item.parameter_id} key={index}>
                          {upFirstChar(item.parameter_title)}
                        </option>
                      ))}
                  </Select>
                  <Select
                    labelTitle="Enter characteristic"
                    changeHandler={(e) =>
                      changeCharacteristic(
                        "characteristic",
                        e.target.value,
                        char.id
                      )
                    }
                    selectDefaultValue={`${char.characteristic}`}
                    selectTitle="Enter characteristic"
                  >
                    {allCharacteristics
                      .filter((item) => +char.parameter === item.parameter)
                      .map((item, index) => (
                        <option value={item.characteristic_id} key={index}>
                          {upFirstChar(item.characteristic_title)}
                        </option>
                      ))}
                  </Select>
                  <Button
                    submitHandler={() => dropCharacteristic(char.id)}
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
          <BtnForAddImage
            fileHandler={uploadFileHandler}
            errorNode={<ErrorContainer errorText={errorUploadImages} />}
          >
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
