import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {useNavigate} from "react-router";

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

import ProductControlApi from "lib/api/product-control-api";
import {getCharacteristics} from "lib/api/characteristics-api";
import {getParameters} from "lib/api/parameters-api";
import {IParameters} from "lib/interfaces/parameters/parameters.interface";
import {upFirstChar} from "lib/utils/up-first-char";
import {
  IDataForCreating,
  ITempChar,
} from "lib/interfaces/products/creating-product.interface";
import {IProductImages} from "lib/interfaces/products/upload-image.interface";
import {ICharacteristics} from "lib/interfaces/characteristics/characteristic.interface";

import {selectCategories} from "store/categories/categories-selectors";
import {
  clearProductControl,
  createProductTrigger,
} from "store/product-control/product-control-actions";
import {
  selectProductControlStatus,
  selectProductControlError,
  selectProductControlSuccess,
} from "store/product-control/product-control-selectors";
import {useAppDispatch, useAppSelector} from "store/store-types";

interface Props {
}

const CreateProduct: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(0);
  const categories = useAppSelector(selectCategories);
  const success = useAppSelector(selectProductControlSuccess);
  const isLoading = useAppSelector(selectProductControlStatus);
  const error = useAppSelector(selectProductControlError);

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [characteristics, setCharacteristics] = useState<ITempChar[]>([]);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [uploadImages, setUploadImages] = useState<IProductImages[]>([]);


  const [allParameters, setAllParameters] = useState<IParameters[]>([]);
  const [allCharacteristics, SetAllCharacteristics] = useState<
    ICharacteristics[]
  >([]);
  const prevSubcategory = useRef<null | number>(null);

  useEffect(() => {
    const fetchParametersAndCharacteristics = async () => {
      setAllParameters(await getParameters());
      SetAllCharacteristics(await getCharacteristics());
    };
    fetchParametersAndCharacteristics();
    return () => {
      dispatch(clearProductControl());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        char.id === id ? {...char, [key]: value} : char
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


  return (
    <ContentContainer>
      <Title>Add new product</Title>
      <Select
        labelTitle="Choose category"
        changeHandler={(e) => setCategoryId(+e.target.value)}
        selectDefaultValue="0"
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
        selectDefaultValue="0"
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
        labelText="Enter product name"
        changeHandler={(e) => setProductTitle(e.target.value)}
        value={productTitle}
        type="text"
      />

      <TextArea
        labelText="Enter product description"
        changeHandler={(e) => setProductDescription(e.target.value)}
        value={productDescription}
      />

      <Input
        labelText="Enter price"
        changeHandler={(e) => setPrice(e.target.value)}
        value={price}
        type="number"
        min={0}
      />

      <Button submitHandler={addCharacteristic} isPurpleButton={false}>
        Add characteristic
      </Button>

      {allCharacteristics.length &&
        allParameters.length &&
        characteristics.map((char, index) => (
          <div key={char.id}>
            <AddProductCharacteristicTitle index={index}/>
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
                style={{background: "red"}}
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
      <BtnForAddImage fileHandler={fileHandler}>Add images</BtnForAddImage>

      <Button submitHandler={createProduct}>Create new product</Button>
    </ContentContainer>
  );
};

export default CreateProduct;
