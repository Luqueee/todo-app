export const HANDLE_MODAL_TASKS = "HANDLE_MODAL_TASKS";
export const IS_OPEN_MODAL_TASKS = "IS_OPEN_MODAL_TASKS";

type IsOpenModalTasks = {
  type: typeof IS_OPEN_MODAL_TASKS;
  payload: boolean;
};

type HandleModalTasks = {
  type: typeof HANDLE_MODAL_TASKS;
};

export type TaskActionTypes = IsOpenModalTasks | HandleModalTasks;

//Example of a constant type
// export type AuthActionTypes =
//   | LoginStartAction
//   | LoginSuccessAction
//   | LoginFailureAction
//   | LogoutStartAction
//   | LogoutSuccessAction
//   | LogoutFailureAction;
