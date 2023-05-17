import { faker } from '@faker-js/faker';

import { Word } from './word.model';

export const generateOneWord = (): Word => {
  return {
    id: faker.string.uuid(),
    text_es: faker.commerce.productName(),
    text_en: faker.commerce.productName(),
    rating: faker.number.int(),
  };
};

export const generateManyWords = (size = 10): Word[] => {
  const words: Word[] = [];
  for (let index = 0; index < size; index++) {
    words.push(generateOneWord());
  }
  return [...words];
};
