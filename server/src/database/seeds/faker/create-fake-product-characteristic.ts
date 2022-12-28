import { faker } from "@faker-js/faker";

const addFakeCharacteristics = (id: number, index: number) => {
  const characteristic_title = faker.lorem.word();
  const characteristic_description = faker.commerce.productAdjective();

  return {
    product_characteristic_id: id,
    product: index,
    characteristic_title,
    characteristic_description,
  };
};

export const createCharacteristics = () => {
  let arr = [];
  for (let i = 1; i <= 200; i++) {
    for (let k = 0; k < 3; k++) {
      arr.push(addFakeCharacteristics(+`${i}${k}`, i));
    }
  }
  return arr;
};
