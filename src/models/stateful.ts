/* eslint-disable no-underscore-dangle */
export default abstract class Stateful<T> {
  private _state: T;

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
