export enum ModalType {
  Word = 0,
  Note,
  Basic
}
export interface ModalOptions {
  title: string;
  message?: string;
  hasChildComponent: boolean;
  type: ModalType;
}
