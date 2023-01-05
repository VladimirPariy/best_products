import { faker } from "@faker-js/faker";

const addFakeProductCharacteristics = (index: number) => {
  const productID: number[] = [];
  for (let i = 1; i <= 200; i++) {
    productID.push(i);
  }

  const characteristicId: number[] = [];
  for (let i = 1; i <= 180; i++) {
    characteristicId.push(i);
  }
  const characteristic = faker.helpers.arrayElement(characteristicId);
  const product = faker.helpers.arrayElement(productID);

  return {
    product_characteristic_id: index,
    product,
    characteristic,
  };
};

export const createProductCharacteristics = () => {
  let arr = [];
  let index = 1;
  for (let i = 1; i <= 200; i++) {
    for (let k = 0; k < 5; k++) {
      arr.push(addFakeProductCharacteristics(index));
      index++;
    }
  }
  return arr;
};
