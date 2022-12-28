import { faker } from "@faker-js/faker";

const addFakeSubcategory = (id: number, index: number) => {
  const subcategory_title = faker.commerce.product();

  return {
    subcategory_id: id,
    category: index,
    subcategory_title,
  };
};

export const createSubcategories = () => {
  let arr = [];
  for (let i = 1; i <= 3; i++) {
    for (let k = 0; k < 6; k++) {
      arr.push(addFakeSubcategory(+`${i}${k}`, i));
    }
  }

  return arr;
};
