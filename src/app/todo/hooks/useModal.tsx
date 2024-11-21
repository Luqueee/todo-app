import useModalStore from "@/stores/modalStore";

interface ModalTask {
  handleModalTasks: () => void;
  handleModalCategory: () => void;
}

const useModal = (): ModalTask => {
  const modal = useModalStore((state) => state);

  const handleModalTasks = () => {
    modal.handleModalIsOpenTask();
  };

  const handleModalCategory = () => {
    modal.handleModalIsOpenCategory();
  };

  return {
    handleModalTasks,
    handleModalCategory,
  };
};

export default useModal;
