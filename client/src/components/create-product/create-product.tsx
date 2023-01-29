import { useAllParameters } from "lib/hooks/use-all-parameters";
import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";

import AddProductCharacteristicContainer from "components/ui/add-product-characteristic-container/add-product-characteristic-container";
import ErrorContainer from "components/ui/error-container/error-container";
import { Loader } from "components/ui/loader/loader";
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
import ProductControlApi from "lib/api/product-control-api";
import { upFirstChar } from "lib/utils/up-first-char";
import {
  IDataForCreating,
  ITempChar,
} from "lib/interfaces/products/creating-product.interface";
import { IProductImages } from "lib/interfaces/products/upload-image.interface";

import { selectCategories } from "store/categories/categories-selectors";
import { createProductTrigger } from "store/product-control/product-control-actions";
import {
  selectProductControlStatus,
  selectProductControlSuccess,
} from "store/product-control/product-control-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";

const CreateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const success = useAppSelector(selectProductControlSuccess);
  const isLoading = useAppSelector(selectProductControlStatus);
  const { allCharacteristics, allParameters } = useAllParameters();

  const [categoryId, setCategoryId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [characteristics, setCharacteristics] = useState<ITempChar[]>([]);
  const [uploadImages, setUploadImages] = useState<IProductImages[]>([]);

  const prevSubcategory = useRef<null | number>(null);

  const [errorProductTitle, setErrorProductTitle] =
    useState<ErrorValidationInterface>(null);
  const [errorDescription, setErrorDescription] =
    useState<ErrorValidationInterface>(null);
  const [errorPrice, setErrorPrice] = useState<ErrorValidationInterface>(null);
  const [errorSubcategory, setErrorSubcategory] =
    useState<ErrorValidationInterface>(null);
  const [errorCategory, setErrorCategory] =
    useState<ErrorValidationInterface>(null);
  const [errorCharacteristic, setErrorCharacteristic] =
    useState<ErrorValidationInterface>(null);
  const [errorUploadImages, setErrorUploadImages] =
    useState<ErrorValidationInterface>(null);

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

  useEffect(() => {
    if (subcategoryId !== prevSubcategory.current) {
      setCharacteristics([]);
    }
    prevSubcategory.current = subcategoryId;
  }, [subcategoryId]);

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

  const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const duplicateImg = uploadImages.find((img) => {
        return img.original_title === file[0].name && img.size === file[0].size
          ? file[0]
          : null;
      });
      if (!duplicateImg) {
        const formData = new FormData();
        if (file instanceof FileList) formData.append(`img`, file[0]);
        const image = await ProductControlApi.uploadTempImage(formData);
        setUploadImages([...uploadImages, image]);
      }
    }
  };

  const dropFile = async (image_id: number) => {
    const remove = await ProductControlApi.dropTempImage(image_id);
    if (remove.status === 200) {
      setUploadImages((prev) =>
        prev.filter((img) => img.image_id !== image_id)
      );
    }
  };

  const createProduct = async () => {
    const isPossibleCreate =
      categoryId &&
      subcategoryId &&
      productTitle &&
      productDescription &&
      price &&
      characteristics.length &&
      uploadImages.length;

    if (productTitle.length === 0) {
      setErrorProductTitle(ValidationMessage.required);
    }
    if (price.length === 0) {
      setErrorPrice(ValidationMessage.required);
    }
    if (productDescription.length === 0) {
      setErrorDescription(ValidationMessage.required);
    }
    if (subcategoryId === 0) {
      setErrorSubcategory(ValidationMessage.required);
    }
    if (categoryId === 0) {
      setErrorCategory(ValidationMessage.required);
    }
    if (characteristics.length === 0) {
      setErrorCharacteristic(ValidationMessage.invalidCharacteristics);
    }
    if (uploadImages.length === 0) {
      setErrorUploadImages(ValidationMessage.invalidImages);
    }

    if (isPossibleCreate) {
      const dataForInserting: IDataForCreating = {
        category: categoryId,
        subcategory: subcategoryId,
        productTitle,
        productDescription,
        price: +price,
        characteristics: JSON.stringify(
          characteristics.map((item) => item.characteristic)
        ),
        images: JSON.stringify(uploadImages),
      };

      dispatch(createProductTrigger(dataForInserting));
    }
  };

  useEffect(() => {
    if (success) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (productTitle.length > 0 && errorProductTitle) {
      setErrorProductTitle(null);
    }
    if (errorPrice && price.length > 0) {
      setErrorPrice(null);
    }
    if (errorDescription && productDescription.length > 0) {
      setErrorDescription(null);
    }
    if (errorSubcategory && subcategoryId !== 0) {
      setErrorSubcategory(null);
    }
    if (errorCategory && categoryId !== 0) {
      setErrorCategory(null);
    }
    if (errorCharacteristic && characteristics.length !== 0) {
      setErrorCharacteristic(null);
    }
    if (errorUploadImages && uploadImages.length !== 0) {
      setErrorUploadImages(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productTitle,
    price,
    productDescription,
    subcategoryId,
    categoryId,
    characteristics,
    uploadImages,
  ]);
  return (
    <ContentContainer>
      <Title>Add new product</Title>
      <Select
        labelTitle="Choose category"
        changeHandler={(e) => setCategoryId(+e.target.value)}
        selectDefaultValue="0"
        selectTitle="Choose category"
        errorNode={<ErrorContainer errorText={errorCategory} />}
        isError={!!errorCategory}
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
        selectDefaultValue="0"
        selectTitle="Choose subcategory"
        errorNode={<ErrorContainer errorText={errorSubcategory} />}
        isError={!!errorSubcategory}
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
        labelText="Enter product title"
        changeHandler={(e) => setProductTitle(e.target.value)}
        value={productTitle}
        type="text"
        isError={!!errorProductTitle}
        children={<ErrorContainer errorText={errorProductTitle} />}
      />

      <TextArea
        labelText="Enter product description"
        changeHandler={(e) => setProductDescription(e.target.value)}
        value={productDescription}
        isError={!!errorDescription}
        children={<ErrorContainer errorText={errorDescription} />}
      />

      <Input
        labelText="Enter price"
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
        Add characteristic
      </Button>

      {allCharacteristics.length &&
        allParameters.length &&
        characteristics.map((char, index) => (
          <div key={char.id}>
            <AddProductCharacteristicTitle index={index} />
            <AddProductCharacteristicContainer>
              <Select
                labelTitle="Enter parameter"
                changeHandler={(e) =>
                  changeCharacteristic("parameter", e.target.value, char.id)
                }
                selectDefaultValue="0"
                selectTitle="Enter parameter"
              >
                {allParameters
                  .filter((item) => item.subcategory === subcategoryId)
                  .map((item) => (
                    <option value={item.parameter_id} key={item.parameter_id}>
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
                selectDefaultValue="0"
                selectTitle="Enter characteristic"
              >
                {allCharacteristics
                  .filter((item) => +char.parameter === item.parameter)
                  .map((item) => (
                    <option
                      value={item.characteristic_id}
                      key={item.characteristic_id}
                    >
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
        <Slider
          images={uploadImages}
          deleteHandler={dropFile}
          onDelete={true}
        />
      </AddProductImageContainer>
      <BtnForAddImage
        fileHandler={fileHandler}
        errorNode={<ErrorContainer errorText={errorUploadImages} />}
      >
        Add images
      </BtnForAddImage>

      <Button submitHandler={createProduct}>Create new product</Button>
      {isLoading && <Loader color={"#766ed3"} />}
    </ContentContainer>
  );
};

export default CreateProduct;
