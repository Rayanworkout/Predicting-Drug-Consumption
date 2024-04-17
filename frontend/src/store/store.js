import create from 'zustand';

const useStore = create((set) => ({
    chartType: 'consumption-x',
    setChartType: (chartType) => set({ chartType }),
    drugType: 'alcohol',
    setDrugType: (drugType) => set({ drugType }),
}));

export default useStore;