import type { Dispatch } from "redux";
import { setOpenModalTasks } from "../actionCreators/tasksActionCreators";

export const createTask = (task: {
  title: string;
  description: string;
  dueDate: string;
  isCompleted?: boolean;
}) => {
  return async (dispatch: Dispatch) => {
    // Create a new task.
    // Required fields: title, description, dueDate
    // Optional fields: isCompleted
    // Returns the created task.

    fetch("/api/todo/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    dispatch(setOpenModalTasks(false));
  };
};

export const handleModalTask = (isOpen: boolean) => {
  return async (dispatch: Dispatch) => {
    console.log("handleModalTask", isOpen);
    dispatch(setOpenModalTasks(isOpen));
  };
};
