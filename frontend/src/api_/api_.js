
//url api
const API_URL = "http://127.0.0.1:8000/"

/**
 *
 * @param objectParam
 * @param urlParam
 * @returns {Promise<any>}
 * @constructor
 */
export function GET_CONSUMPTION_DATA(objectParam, urlParam){
    const baseurl = '/api/consumption/' + urlParam;
    const fullUrl = `${baseurl}?${objectParam.toString()}`

    const data = fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
            throw error;
        });
    return data;
}
export function GET_REPARTITION_DATA(param){
    const fullUrl = '/api/repartition/by_population/?population='+ param;
    return fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
            throw error;
        });
}

export function GET_CORRELATION_DATA(){
    const fullUrl = '/api/correlation/drug_and_personality';
    return fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
            throw error;
        });
}

export function GET_CORRELATION_MEANING_DATA(){
    const fullUrl = '/api/correlation/feature_to_drug_mean';
    return fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
            throw error;
        });
}