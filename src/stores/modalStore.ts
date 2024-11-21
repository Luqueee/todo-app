import { create } from "zustand";

interface ModalState {
  isOpenModalTask: boolean;
  isOpenModalCategory: boolean;
  handleModalIsOpenTask: () => void;
  handleModalIsOpenCategory: () => void;
}

const useModalStore = create<ModalState>()((set) => ({
  isOpenModalTask: false,
  isOpenModalCategory: false,
  handleModalIsOpenTask: () =>
    set((state) => ({ isOpenModalTask: !state.isOpenModalTask })),
  handleModalIsOpenCategory: () =>
    set((state) => ({ isOpenModalCategory: !state.isOpenModalCategory })),
}));

export default useModalStore;
