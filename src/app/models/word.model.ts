export interface Word {
  id: string;
  text_es: string;
  text_en: string;
  rating: number;
  hideAllText: boolean;
}

export type CreateWordDTO = Omit<Word, 'id' | 'hideAllText' | 'rating'>;
