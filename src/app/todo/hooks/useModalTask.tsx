import store from "@/redux/store";

interface ModalTask {
  handleModalTasks: () => void;
}

const useModalTask = (): ModalTask => {
  const handleModalTasks = () => {
    store.dispatch({ type: "HANDLE_MODAL_TASKS" });
  };

  return {
    handleModalTasks,
  };
};

export default useModalTask;
