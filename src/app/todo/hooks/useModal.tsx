import type { Task } from "@/db/task/schema";
import useModalStore from "@/stores/modalStore";
import useTaskStore from "@/stores/taskStore";

interface ModalTask {
  handleModalTasks: () => void;
  handleModalCategory: () => void;
  handleEditTask: (task: Task) => void;
}

const useModal = (): ModalTask => {
  const modal = useModalStore((state) => state);
  const taskStore = useTaskStore((state) => state);

  const handleModalTasks = () => {
    modal.handleModalIsOpenTask();
  };

  const handleModalCategory = () => {
    modal.handleModalIsOpenCategory();
  };

  const handleEditTask = (task: Task) => {
    console.log(task);
    taskStore.setTask({
      id: task._id as string,
      title: task.title,
      description: task.description ?? "",
      dueDate: task.dueDate,
      completed: task.isCompleted as boolean,
      category: task.category as string,
    });
    handleModalTasks();
  };

  return {
    handleModalTasks,
    handleModalCategory,
    handleEditTask,
  };
};

export default useModal;
