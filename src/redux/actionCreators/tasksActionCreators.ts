import { IS_OPEN_MODAL_TASKS } from "../constants/tasksConstants";

export const setOpenModalTasks = (isOpen: boolean) => {
  return {
    type: IS_OPEN_MODAL_TASKS,
    payload: isOpen,
  };
};
