export interface Note {
  id: string;
  title: string;
  text: string;
  urlImg: string;
  rating: number;
  hideAllText: boolean;
}

export type CreateNoteDTO = Omit<Note, 'id' | 'hideAllText' | 'rating'>;
