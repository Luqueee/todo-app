// import { create } from "zustand";

// interface BearState {
//   bears: number;
//   increase: (by: number) => void;
// }

//types
// const useBearStore = create<BearState>()((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }));

// import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

// interface BearState {
//   bears: number
//   increase: (by: number) => void
// }

// const useBearStore = create<BearState>()(
//   devtools(
//     persist(
//       (set) => ({
//         bears: 0,
//         increase: (by) => set((state) => ({ bears: state.bears + by })),
//       }),
//       { name: 'bearStore' },
//     ),
//   ),
// )

//prevent rerender
// import { create } from 'zustand'
// import { useShallow } from 'zustand/react/shallow'

// const useMeals = create(() => ({
//   papaBear: 'large porridge-pot',
//   mamaBear: 'middle-size porridge pot',
//   littleBear: 'A little, small, wee pot',
// }))

// export const BearNames = () => {
//   const names = useMeals(useShallow((state) => Object.keys(state)))

//   return <div>{names.join(', ')}</div>
// }
