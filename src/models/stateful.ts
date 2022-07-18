export default abstract class Stateful<T> {
  protected _state: T;

  public get state(): T {
    return this._state;
  }

  public set state(nextState: T) {
    this._state = nextState;
  }

  constructor(initialState: T) {
    this._state = initialState;
  }
}
