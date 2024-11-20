"use client";
import store from "@/redux/store";
export default function CreateTask() {
  const handlerCreateTask = async () => {
    // Create a new task.
    // Required fields: title, description, dueDate
    // Optional fields: isCompleted
    // Returns the created task.

    fetch("/api/todo/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: "New task",
        description: "Description of the new task",
        dueDate: new Date().toISOString(),
      }),
    });
  };

  const handleModalTasks = () => {
    store.dispatch({ type: "HANDLE_MODAL_TASKS" });
  };

  return (
    <div className="flex flex-col gap-4 w-fit">
      <button onClick={handlerCreateTask} type="button">
        Create task
      </button>
      <button type="button" onClick={handleModalTasks}>
        Test
      </button>
    </div>
  );
}
