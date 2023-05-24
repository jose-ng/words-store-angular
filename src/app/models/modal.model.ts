export enum ModalType {
  Word = 0,
  Note,
}
export interface ModalOptions {
  title: string;
  description?: string;
  confirmButton?: boolean;
  type: ModalType;
}
