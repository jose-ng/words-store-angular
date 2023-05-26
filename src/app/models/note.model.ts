export interface Note {
  id: string;
  title: string;
  text: string;
  urlImg: string;
  rating: number;
  hideAllText: boolean;
}

export interface CreateNoteDTO
  extends Omit<Note, 'id' | 'hideAllText' | 'rating'> {
  code: number;
}
