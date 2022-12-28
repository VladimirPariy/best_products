import {AxiosError} from "axios";
import ProductsApi from "lib/api/products-api";
import {uploadProductImageTrigger} from "lib/store/product-detail/product-detail-actions";
import React, {FC, useState, ChangeEvent, MouseEvent} from "react";

import AddProductCharacteristicContainer from "components/ui/add-product-characteristic-container/add-product-characteristic-container";
import AddProductCharacteristicTitle from "components/ui/add-product-characteristic-title/add-product-characteristic-title";
import AddProductImageContainer from "components/ui/add-product-image-container/add-product-image-container";
import Slider from "components/ui/slider/slider";
import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import ContentContainer from "components/ui/content-container/content-container";
import Select from "components/ui/select/select";
import Button from "components/ui/button/button";
import Input from "components/ui/input/input";
import TextArea from "components/ui/text-area/text-area";
import Title from "components/ui/title/title";

import {IModifyProductImages, IPreview, IProductImages} from "lib/interfaces/products/upload-image";
import productsApi from "lib/api/products-api";
import {useNavigateHome} from "lib/hooks/useNavigateHome";
import {selectCategories} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import {useNavigate} from "react-router";

interface IChar {
  characteristic_title: string;
  characteristic_description: string;
  id: number
}

const AddNewProduct: FC = () => {
  const navigate = useNavigate()
  useNavigateHome();
  const [categoryId, setCategoryId] = useState(0);
  const categories = useAppSelector(selectCategories);

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [characteristics, setCharacteristics] = useState<IChar[]>([]);

  const [uploadImages, setUploadImages] = useState<IProductImages[]>([]);

  const [subcategoryId, setSubcategoryId] = useState(0);

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const addCharacteristic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCharacteristics([
      ...characteristics,
      {
        characteristic_title: "",
        characteristic_description: "",
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
        char.id === id ? {...char, [key]: value} : char
      )
    );
  };

  const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const duplicateImg = uploadImages
      .find(img => {
        return (img.original_title === file[0].name
          && img.size === file[0].size)
          ? file[0]
          : null
      })
      if (!duplicateImg) {
        const formData = new FormData();
        if (file instanceof FileList) formData.append(`img`, file[0]);
        const image = await ProductsApi.uploadTempImage(formData)
        setUploadImages([...uploadImages, image]);
      }
    }
  };

  const dropFile = (image_id: number) => {
    console.log(image_id)
  }

  // const createProduct = async () => {
  //   let formData = new FormData();
  //   formData.append("category", `${categoryId}`);
  //   formData.append("subcategory", `${subcategoryId}`);
  //   formData.append("productTitle", productTitle);
  //   formData.append("productDescription", productDescription);
  //   formData.append("price", price);
  //   formData.append("characteristics", JSON.stringify(characteristics));
  //   let i = 0;
  //   for (const file of uploadImages) {
  //     if (file instanceof File) formData.append(`img${i}`, file);
  //     i++;
  //   }
  //
  //   // try {
  //   //   setIsLoading(true)
  //   //   const data = await productsApi.createNewProduct(formData);
  //   //   if (data) navigate(-1)
  //   // } catch (e) {
  //   //   if (e instanceof AxiosError) setError(e)
  //   // } finally {
  //   //   setIsLoading(false)
  //   // }
  // };
  // console.log(uploadImages)
  return (
    <ContentContainer>
      <Title>Add new product</Title>
      <Select labelTitle='Choose category'
              changeHandler={(e) => setCategoryId(+e.target.value)}
              selectDefaultValue='0'
              selectTitle='Choose category'>
        {categories.map((category) => (
          <option value={category.category_id}
                  key={category.category_id}>
            {category.category_title}
          </option>
        ))}
      </Select>
      <Select labelTitle='Choose subcategory'
              changeHandler={(e) => setSubcategoryId(+e.target.value)}
              selectDefaultValue='0'
              selectTitle='Choose subcategory'>
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

      <Button submitHandler={addCharacteristic}
              isPurpleButton={false}>
        Add characteristic
      </Button>

      {characteristics &&
        characteristics.map((char, index) => (
          <div key={char.id}>
            <AddProductCharacteristicTitle index={index}/>
            <AddProductCharacteristicContainer>
              <Input
                labelText="Enter characteristic title"
                changeHandler={(e) =>
                  changeCharacteristic(
                    "characteristic_title",
                    e.target.value,
                    char.id
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
                    char.id
                  )
                }
                value={char.characteristic_description}
              />

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
        <Slider images={uploadImages} deleteHandler={dropFile} onDelete={true}/>
      </AddProductImageContainer>
      <BtnForAddImage fileHandler={fileHandler}>Add images</BtnForAddImage>

      {/*<Button submitHandler={createProduct}>*/}
      {/*  Create new product*/}
      {/*</Button>*/}
    </ContentContainer>
  );
};

export default AddNewProduct;
