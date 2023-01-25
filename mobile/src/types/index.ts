export interface ActionType<T> {
  payload: T;
  type: string;
}

export interface StateType {
  user: any;
}

export type ServicesType =
  | "meta"
  | "compress"
  | "merge"
  | "2word"
  | "2pdf"
  | "encrypt"
  | "decrypt"
  | "images"
  | "text"
  | "annotations"
  | "watermarks";
