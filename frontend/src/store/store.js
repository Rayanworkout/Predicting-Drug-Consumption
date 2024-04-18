import create from 'zustand';
import {GET_CONSUMPTION_DATA} from "@/api_/api_.js";

const useStore = create((set, get) => ({
    chartType: 'consumption-x',
    setChartType: (chartType) => set({ chartType }),

    drugType: 'alcohol',
    setDrugType: (drugType) => {
        const currentApiParam = get().apiParam;
        set({
            drugType,
            apiParam: { ...currentApiParam, drug: drugType }
        });
    },

    consumptionType: 'by_age',
    setConsumptionType: (consumptionType) => set({consumptionType}),

    apiParam:{age_range: '18-24', drug: 'alcohol' },
    setApiParam: (apiParam) => set({ apiParam }),

    apiData: {data: {}},
    setApiData: (apiData) => set({apiData}),

    getFunctionToCall: () => {
        const { chartType, apiParam, consumptionType, setApiData } = get();
        switch (chartType) {
            case 'consumption-x':
            case 'consumption-y': // Regroupement de cas
                return () => {
                    GET_CONSUMPTION_DATA(new URLSearchParams(apiParam), consumptionType)
                        .then(data => setApiData(data))
                        .catch(error => console.error('Failed to fetch data:', error));
                };
            case 'other':
                return () => console.log("'other' type case");
            default:
                return () => console.log("Default case");
        }
    }
}));

export default useStore;