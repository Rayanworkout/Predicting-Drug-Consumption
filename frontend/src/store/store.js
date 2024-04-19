import create from 'zustand';
import {GET_REPARTITION_DATA, GET_CONSUMPTION_DATA} from "@/api_/api_.js";

const useStore = create((set, get) => ({
    chartType: 'consumption-x',
    setChartType: (chartType) => set({ chartType }),

    drugValues : ["alcohol", "amphet", "amyl", "benzos", "caff", "cannabis", "choc", "coke", "crack", "ecstasy", "heroin", "ketamine", "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"],
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

    apiData: {data:{}},
    setApiData: (apiData) => set({apiData}),

    apiRepartitionData: {data:[]},
    setApiRepartitionData: (apiRepartitionData) => set({apiRepartitionData}),

    getFunctionToCall: () => {
        const { chartType, apiParam, consumptionType, setApiData, setApiRepartitionData } = get();
        switch (chartType) {
            case 'consumption-x':
            case 'consumption-y':
                return () => {
                    GET_CONSUMPTION_DATA(new URLSearchParams(apiParam), consumptionType)
                        .then(data => setApiData(data))
                        .catch(error => console.error('Failed to fetch data:', error));
                };
            case 'repartition':
                return () => {
                    const consumptionRepartition = consumptionType.substring(3);
                    GET_REPARTITION_DATA(consumptionRepartition)
                        .then(data => setApiRepartitionData(data))
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