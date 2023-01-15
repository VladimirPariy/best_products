import { faker } from "@faker-js/faker";

const addFakeSubcategory = (id: number, index: number) => {
  const subcategoryBanner = [
    "banner-books.png",
    "banner-laptop.png",
    "banner-phone.png",
    "banner-sports.png",
    "banner-travels.png",
  ];
  const subcategory_title = faker.helpers.unique(faker.commerce.product);
  const background_image = faker.helpers.arrayElement(subcategoryBanner);
  return {
    subcategory_id: id,
    category: index,
    subcategory_title,
    background_image,
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
