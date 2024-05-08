import {create} from 'zustand';
import translations from "@/assets/lang/translations.js";
import {
    GET_REPARTITION_DATA,
    GET_CONSUMPTION_DATA,
    GET_CORRELATION_DATA,
    GET_CORRELATION_MEANING_DATA
} from "@/api_/api_.js";

const useStore = create((set, get) => ({
    language: 'fr',
    translations: translations['fr'],
    setLanguage: (language) => {
        set({
            language: language,
            translations: translations[language],
        });
    },

    screenSize:0,
    setScreenSize:(screenSize) => set({screenSize}),
    chartType: 'consumption',
    setChartType: (chartType) => set({ chartType }),

    drugData : [
        {drug: 'Alcohol', value: 'alcohol'},
        {drug: 'Amphetamine', value: 'amphet'},
        {drug: 'Amyl', value: 'amyl'},
        {drug: 'Benzos', value: 'benzos'},
        {drug: 'Cafféine', value: 'caff'},
        {drug: 'Cannabis', value: 'cannabis'},
        {drug: 'Chocolate', value: 'choc'},
        {drug: 'Cockaine', value: 'coke'},
        {drug: 'Crack', value: 'crack'},
        {drug: 'Ecstasy', value: 'ecstasy'},
        {drug: 'Heroin', value: 'heroin'},
        {drug: 'Ketamin', value: 'ketamine'},
        {drug: 'Leghal', value: 'legalh'},
        {drug: 'LSD', value: 'lsd'},
        {drug: 'Methamphetamine', value: 'meth'},
        {drug: 'Mushrooms', value: 'mushrooms'},
        {drug: 'Nicotine', value: 'nicotine'},
        {drug: 'Semer', value: 'semer'},
        {drug: 'VSA', value: 'vsa'},
    ],

    drugType: 'cannabis',
    setDrugType: (drugType) => {
        const currentApiParam = get().apiParam;
        set({
            drugType,
            apiParam: { ...currentApiParam, drug: drugType }
        });
    },

    drugTypePrettier: 'Cannabis',
    setDrugTypePrettier: (drugTypePrettier) => set({drugTypePrettier}),


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

    getFunctionToCall: () => {
        const { chartType, apiParam, consumptionType, setApiData, setApiRepartitionData, setApiCorrelationData } = get();
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
                switch (consumptionType){
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