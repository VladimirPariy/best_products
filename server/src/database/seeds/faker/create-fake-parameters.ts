import { faker } from "@faker-js/faker";

const addFakeParameters = (id: number, index: number) => {
  const subcategoryVariants = [
    10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35,
  ];

  const parameter_title = faker.lorem.word();
  const subcategory = subcategoryVariants[id];

  return {
    parameter_id: index,
    subcategory,
    parameter_title,
  };
};

export const createParameters = () => {
  let arr = [];
  let index = 1;
  for (let i = 0; i < 18; i++) {
    for (let k = 1; k <= 2; k++) {
      arr.push(addFakeParameters(i, index));
      index++;
    }
  }
  return arr;
};
