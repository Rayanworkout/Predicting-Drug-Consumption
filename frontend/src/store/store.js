import create from 'zustand';

const useStore = create((set) => ({
    chartType: 'consumption-x',
    setChartType: (chartType) => set({ chartType }),

    drugType: 'alcohol',
    setDrugType: (drugType) => set({ drugType }),

    consumptionType: 'by_age',
    setConsumptionType: (consumptionType) => set({consumptionType}),

    apiParam:{age_range:"", drug:""},
    setApiParam: (apiParam) => set({apiParam}),

    apiData: {data: {}},
    setApiData: (apiData) => set({apiData}),
}));

export default useStore;