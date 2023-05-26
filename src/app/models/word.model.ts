export interface Word {
  id: string;
  text_es: string;
  text_en: string;
  rating: number;
  hideAllText: boolean;
}

export interface CreateWordDTO
  extends Omit<Word, 'id' | 'hideAllText' | 'rating'> {
  code: number;
}
