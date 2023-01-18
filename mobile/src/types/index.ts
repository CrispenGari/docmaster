export interface ActionType<T> {
  payload: T;
  type: string;
}

export interface StateType {
  user: any;
}
