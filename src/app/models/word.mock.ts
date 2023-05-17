import { faker } from '@faker-js/faker';

import { Words } from './words';

export const generateOneWord = (): Words => {
  return {
    id: faker.string.uuid(),
    text_es: faker.commerce.productName(),
    text_en: faker.commerce.productName(),
    rating: faker.number.int(),
  };
};

export const generateManyWords = (size = 10): Words[] => {
  const words: Words[] = [];
  for (let index = 0; index < size; index++) {
    words.push(generateOneWord());
  }
  return [...words];
};
