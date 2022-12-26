import React, {FC, useState, ChangeEvent, MouseEvent} from "react";

import styles from "pages/add-new-product/add-new-product.module.scss";


import Slider from "components/ui/slider/slider";
import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import ContentContainer from "components/ui/content-container/content-container";
import Select from "components/ui/select/select";
import Button from "components/ui/button/button";
import Input from "components/ui/input/input";
import TextArea from "components/ui/text-area/text-area";
import Title from "components/ui/title/title";

import productsApi from "lib/api/products-api";
import {useNavigateHome} from "lib/hooks/useNavigateHome";
import {categoriesSelector} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import {ICharacteristic} from "lib/interfaces/characteristics/characteristic";

const AddNewProduct: FC = () => {
  useNavigateHome();
  const [categoryId, setCategoryId] = useState(0);
  const categories = useAppSelector(categoriesSelector);

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);

  const [previewPhoto, setPreviewPhoto] = useState<{ preview: string, file: File }[]>([]);
  const [subcategoryId, setSubcategoryId] = useState(0);

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

  const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file && file.length > 0 && uploadImages) {
      const duplicateImg = uploadImages
      .find(img => {
        return (img.name === file[0].name
          && img.size === file[0].size)
          ? file[0]
          : null
      })
      if (!duplicateImg) {

        setUploadImages([...uploadImages, file[0]]);

        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result && !(e.target?.result instanceof ArrayBuffer))
            setPreviewPhoto([...previewPhoto, {preview: e.target?.result, file: file[0]}]);

        };
        if (file) {
          reader.readAsDataURL(file[0]);
        }
      }
    }
  };


  const createProduct = async () => {
    let formData = new FormData();
    formData.append("category", `${categoryId}`);
    formData.append("subcategory", `${subcategoryId}`);
    formData.append("productTitle", productTitle);
    formData.append("productDescription", productDescription);
    formData.append("price", price);
    formData.append("characteristics", JSON.stringify(characteristics));
    let i = 0;
    for (const file of uploadImages) {
      formData.append(`img${i}`, file);
      i++;
    }

    ///////////
    const data = await productsApi.createNewProduct(formData);
  };

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
            <div className={styles.characteristicTitle}>
              {index + 1} characteristic
            </div>
            <div className={styles.characteristicContainer}>
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
            </div>
          </div>
        ))}

      <div className={styles.imageContainer}>
        <Slider images={previewPhoto} deleteUploadFileHandler={setUploadImages} deletePreviewPhotoHandler={setPreviewPhoto} onDelete={true}/>
      </div>
      <BtnForAddImage fileHandler={fileHandler}>Add images</BtnForAddImage>

      <Button submitHandler={createProduct}>Create new product</Button>
    </ContentContainer>
  );
};

export default AddNewProduct;
