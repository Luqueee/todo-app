import {
  type TasksState,
  initialState,
} from "../initialStates/tasksInitialState";
import {
  type TaskActionTypes,
  IS_OPEN_MODAL_TASKS,
  HANDLE_MODAL_TASKS,
} from "../constants/tasksConstants";

const tasksReducer = (
  // biome-ignore lint/style/useDefaultParameterLast: <explanation>
  state: TasksState = initialState,
  action: TaskActionTypes
) => {
  switch (action.type) {
    case IS_OPEN_MODAL_TASKS:
      console.log("IS_OPEN_MODAL_TASKS", action, state);
      return {
        ...state,
        isOpenModalTasks: action.payload,
      };

    case HANDLE_MODAL_TASKS:
      console.log("HANDLE_MODAL_TASKS", action, state);
      return {
        ...state,
        isOpenModalTasks: !state.isOpenModalTasks,
      };
    default:
      return state;
  }
};

export default tasksReducer;
