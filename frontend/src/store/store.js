import create from 'zustand';
import translations from "@/assets/lang/translations.js";
import {
    GET_REPARTITION_DATA,
    GET_CONSUMPTION_DATA,
    GET_CORRELATION_DATA,
    GET_CORRELATION_MEANING_DATA
} from "@/api_/api_.js";

const useStore = create((set, get) => ({
    language: 'en',
    translations: translations['en'],
    setLanguage: (language) => {
        set({
            language: language,
            translations: translations[language],
        });
    },

    chartType: 'consumption',
    setChartType: (chartType) => set({ chartType }),

    drugValues : ["alcohol", "amphet", "amyl", "benzos", "caff", "cannabis", "choc", "coke", "crack", "ecstasy", "heroin", "ketamine", "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"],
    drugType: 'cannabis',
    setDrugType: (drugType) => {
        const currentApiParam = get().apiParam;
        set({
            drugType,
            apiParam: { ...currentApiParam, drug: drugType }
        });
    },

    consumptionType: 'by_age',
    setConsumptionType: (consumptionType) => set({consumptionType}),

    consumptionOrientationChart: false,
    setConsumptionOrientationChart : (consumptionOrientationChart) => set({consumptionOrientationChart}),

    precisionConsumption: '18-24',
    setPrecisionConsumption: (precisionConsumption) => set({precisionConsumption}),


    apiParam:{age_range: '18-24', drug: 'alcohol' },
    setApiParam: (apiParam) => set({ apiParam }),

    apiData: {data:{}},
    setApiData: (apiData) => set({apiData}),

    apiRepartitionData: {data:[]},
    setApiRepartitionData: (apiRepartitionData) => set({apiRepartitionData}),

    apiCorrelationData: {},
    setApiCorrelationData: (apiCorrelationData) => set({apiCorrelationData}),

    selectedCategories: [], // Catégories sélectionnées
    selectedValues: {}, // Valeurs sélectionnées pour chaque catégorie

    // Met à jour les catégories sélectionnées
    setSelectedCategories: (categories) => {
        set({ selectedCategories: categories });
    },

    // Met à jour les valeurs sélectionnées pour une catégorie donnée
    setSelectedValues: (category, values) => {
        set((state) => ({
            selectedValues: {
                ...state.selectedValues,
                [category]: values
            }
        }));
    },

    // Fonction pour effectuer l'appel API en fonction des sélections
    getFunctionToCall: () => {
        const { chartType, apiParam, consumptionType, precisionConsumption, setApiData, setApiRepartitionData, setApiCorrelationData } = get();
        switch (chartType) {
            case 'consumption':
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
            case 'correlation':
                switch (consumptionType) {
                    case 'drug_and_personality':
                        return () => {
                            GET_CORRELATION_DATA()
                                .then(data => setApiCorrelationData(data))
                                .catch(error => console.error('Failed to fetch data:', error));
                        };
                    case 'feature_to_drug_mean':
                        return () => {
                            GET_CORRELATION_MEANING_DATA()
                                .then(data => setApiCorrelationData(data))
                                .catch(error => console.error('Failed to fetch data:', error));
                        };
                }
            case 'other':
                return () => console.log("'other' type case");
            default:
                return () => console.log("Default case");
        }
    }
}));

export default useStore;