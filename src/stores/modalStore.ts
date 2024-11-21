import { create } from "zustand";

interface ModalState {
  isOpenModalTask: boolean;
  isOpenModalCategory: boolean;
  isOpenModalSearch: boolean;
  handleModalIsOpenTask: () => void;
  handleModalIsOpenCategory: () => void;
  handleModalIsOpenSearch: () => void;
}

const useModalStore = create<ModalState>()((set) => ({
  isOpenModalTask: false,
  isOpenModalCategory: false,
  isOpenModalSearch: false,
  handleModalIsOpenTask: () =>
    set((state) => ({ isOpenModalTask: !state.isOpenModalTask })),
  handleModalIsOpenCategory: () =>
    set((state) => ({ isOpenModalCategory: !state.isOpenModalCategory })),
  handleModalIsOpenSearch: () =>
    set((state) => ({ isOpenModalSearch: !state.isOpenModalSearch })),
}));

export default useModalStore;
