import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import React, {FC, useState, MouseEvent} from "react";

import styles from "pages/add-new-product/add-new-product.module.scss";

import Button from "components/ui/button/button";
import Input from "components/ui/input/input";
import TextArea from "components/ui/text-area/text-area";
import Title from "components/ui/title/title";

import {categoriesSelector} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import {createNewProduct} from "lib/api/admin-api";
import {ICharacteristic} from "lib/interfaces/characteristics/characteristic";

interface Props {
}

const AddNewProduct: FC<Props> = (props) => {
  const [categoryId, setCategoryId] = useState(0)
  const categories = useAppSelector(categoriesSelector)

  const [productTitle, setProductTitle] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [price, setPrice] = useState('')
  const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([])
  const [uploadImage, setUploadImage] = useState<File[]>([])

  const [previewPhoto, setPreviewPhoto] = useState<string[]>([])
  const [subcategoryId, setSubcategoryId] = useState(0)


  const addCharacteristic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCharacteristics([...characteristics, {characteristic_title: '', characteristic_description: '', id: Date.now()}])
  }

  const dropCharacteristic = (id: number) => {
    setCharacteristics(characteristics.filter(char => char.id !== id))
  }

  const changeCharacteristic = (key: string, value: string, id: number) => {
    setCharacteristics(characteristics.map(char => char.id === id ? {...char, [key]: value} : char))
  }

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && uploadImage) {
      setUploadImage([...uploadImage, file[0]]);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result && !(e.target?.result instanceof ArrayBuffer))
          if (previewPhoto) setPreviewPhoto([...previewPhoto, e.target?.result]);
          else setPreviewPhoto([e.target?.result])
      };
      if (file) reader.readAsDataURL(file[0]);
    }
  };

  const createProduct = () => {
    let formData = new FormData();
    formData.append("category", `${categoryId}`);
    formData.append("subcategory", `${subcategoryId}`);
    formData.append("productTitle", productTitle);
    formData.append("productDescription", productDescription);
    formData.append("price", price);
    formData.append("characteristics", JSON.stringify(characteristics));
    let i = 0
    for (const file of uploadImage) {
      formData.append(`img${i}`, file)
      i++
    }
    const data = createNewProduct(formData)
    console.log(data)
  }


  return (
    <div className={styles.wrapper}>
      <Title>
        Add new product
      </Title>
      <label className={styles.label}>
        Choose category
        <select onChange={e => setCategoryId(+e.target.value)} defaultValue="0">
          <option value="0" disabled hidden>Choose category</option>
          {categories && categories.map(category => (
            <option value={category.category_id} key={category.category_id}>
              {category.category_title}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.label}>
        Choose subcategory
        <select onChange={e => setSubcategoryId(+e.target.value)} defaultValue="0">
          <option value="0" disabled hidden>Choose subcategory</option>
          {categories[categoryId - 1]?.subcategories.map(subcategory => (
            <option value={subcategory.subcategory_id} key={subcategory.subcategory_id}>
              {subcategory.subcategory_title}
            </option>
          ))
          }
        </select>
      </label>

      <Input labelText="Enter product name" changeHandler={e => setProductTitle(e.target.value)} value={productTitle} type="text"/>

      <TextArea labelText="Enter product description" changeHandler={e => setProductDescription(e.target.value)} value={productDescription}/>

      <Input labelText="Enter price" changeHandler={e => setPrice(e.target.value)} value={price} type="number" min={0}/>

      <Button submitHandler={addCharacteristic} isPurpleButton={false}>
        Add characteristic
      </Button>

      {
        characteristics && characteristics.map((char, index) => (
          <div key={char.id}>
            <div className={styles.characteristicTitle}>{index + 1} characteristic</div>
            <div className={styles.characteristicContainer}>

              <Input labelText="Enter characteristic title" changeHandler={e => changeCharacteristic('characteristic_title', e.target.value, char.id)} value={char.characteristic_title}/>
              <Input labelText="Enter characteristic description" changeHandler={e => changeCharacteristic('characteristic_description', e.target.value, char.id)}
                     value={char.characteristic_description}/>


              <Button submitHandler={() => dropCharacteristic(char.id)} style={{background: 'red'}}>
                Delete
              </Button>
            </div>
          </div>
        ))
      }

      <div className={styles.imageContainer}>
        {
          previewPhoto && previewPhoto.map(photo => <img src={photo} alt="" key={photo}/>)
        }
      </div>
      <BtnForAddImage fileHandler={fileHandler}>
        Add images
      </BtnForAddImage>

      <Button submitHandler={createProduct}>
        Create new product
      </Button>
    </div>
  );
};

export default AddNewProduct;