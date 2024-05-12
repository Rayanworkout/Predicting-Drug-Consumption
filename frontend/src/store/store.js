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
    fetchData: () => {
        const { chartType, consumptionType, selectedValues, setApiData, setApiRepartitionData, setApiCorrelationData } = get();
        let apiParam = ''; // Chaîne de requête pour les paramètres API
    
        // Construire les paramètres API en fonction des sélections
        switch (chartType) {
            case 'consumption':
                apiParam = Object.entries(selectedValues).map(([key, value]) => `${key}=${value}`).join('&');
                GET_CONSUMPTION_DATA(apiParam, consumptionType)
                    .then(data => setApiData(data))
                    .catch(error => console.error('Failed to fetch data:', error));
                break;
            case 'repartition':
                const consumptionRepartition = consumptionType.substring(3);
                GET_REPARTITION_DATA(consumptionRepartition)
                    .then(data => setApiRepartitionData(data))
                    .catch(error => console.error('Failed to fetch data:', error));
                break;
            case 'correlation':
                switch (consumptionType) {
                    case 'drug_and_personality':
                        GET_CORRELATION_DATA()
                            .then(data => setApiCorrelationData(data))
                            .catch(error => console.error('Failed to fetch data:', error));
                        break;
                    case 'feature_to_drug_mean':
                        GET_CORRELATION_MEANING_DATA()
                            .then(data => setApiCorrelationData(data))
                            .catch(error => console.error('Failed to fetch data:', error));
                        break;
                    default:
                        console.error("Unknown consumptionType:", consumptionType);
                }
                break;
            default:
                console.error("Unknown chartType:", chartType);
        }
    },    
    
    getFunctionToCall: () => {
        const { chartType } = get();
        switch (chartType) {
            case 'consumption':
            case 'repartition':
            case 'correlation':
                return () => {
                    // Appeler fetchData pour récupérer les nouvelles données en fonction des sélections
                    get().fetchData();
                };
            case 'other':
                return () => console.log("'other' type case");
            default:
                console.error("Unknown chartType:", chartType);
                return () => console.log("Default case");
        }
    }    
}));

export default useStore;