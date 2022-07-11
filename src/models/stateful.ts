/* eslint-disable no-underscore-dangle */
export default abstract class Stateful<T> {
  protected _state: T;

  get state() {
    return this._state;
  }

  set state(nextState: T) {
    this._state = nextState;
  }

  constructor(initialState: T) {
    this._state = initialState;
  }
}
