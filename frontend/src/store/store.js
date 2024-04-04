import create from 'zustand';
export const useStore = create((set) => ({
    data: [],
    initializeData: (newData) => set({data: newData})
}))