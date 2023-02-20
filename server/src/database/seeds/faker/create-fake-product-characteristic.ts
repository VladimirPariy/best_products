import { faker } from "@faker-js/faker";

interface IProd {
  product: number;
  subcategory: number;
}
interface IParam {
  parameter_id: number;
  subcategory: number;
  parameter_title: string;
}
interface IChar {
  characteristic_id: number;
  characteristic_title: string;
  parameter: number;
}

const addFakeProductCharacteristics = (
  index: number,
  prod: IProd[],
  param: IParam[],
  chars: IChar[]
) => {
  const productID: number[] = [];
  for (let i = 1; i <= 200; i++) {
    productID.push(i);
  }

  const product = faker.helpers.arrayElement(productID);

  const subcategory = prod.find((prod) => prod.product === product)?.subcategory;
  const parameters = param
    .filter((parameter) => parameter.subcategory === subcategory)
    .map((item) => item.parameter_id);

  const charList = chars
    .filter((char) => parameters.includes(char.parameter))
    .map((charId) => charId.characteristic_id);

  const characteristic = faker.helpers.arrayElement(charList);

  return {
    product_characteristic_id: index,
    product,
    characteristic,
  };
};

export const createProductCharacteristics = (prod: IProd[], param: IParam[], chars: IChar[]) => {
  let arr = [];
  let index = 1;
  for (let i = 1; i <= 200; i++) {
    for (let k = 0; k < 5; k++) {
      arr.push(addFakeProductCharacteristics(index, prod, param, chars));
      index++;
    }
  }
  return arr;
};
