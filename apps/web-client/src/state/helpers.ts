import type { State } from 'easy-peasy';

/**
 * Represents an immutable action.
 *
 * @example
 *
 * import { Action } from 'easy-peasy';
 *
 * interface Model {
 *   todos: Array<Todo>;
 *   addTodo: ImmutableAction<Model, Todo>;
 * }
 */
export interface ImmutableAction<Model extends object, Payload = void> {
  type: 'action';
  payload: Payload;
  result: State<Model>;
}
