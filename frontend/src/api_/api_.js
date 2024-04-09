
//url api
const API_URL = "http://127.0.0.1:8000"

/**
 * Get All Data from database
 * @returns {Promise<any|*[]>}
 * @constructor
 */
export async function GET_ALL(){
    const baseurl = "/api/companies";

    try{
        const response = await fetch(baseurl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log("GET ERROR " + error)
        return []
    }
}

/**
 * Get random data from a selected graph
 * @returns {Promise<any|*[]>}
 * @constructor
 */
export async function GET_RANDOM_DATA_BY_GRAPH(){
}

/**
 * Get data from a @drug ordered by @orderByParam
 * @returns {Promise<any|*[]>}
 * @constructor
 */
export function GET_DATA_BY_DRUG_ORDER_BY_AGE(objectParam){
    const baseurl = '/api/consumption/by_age';
    const params = new URLSearchParams(objectParam)

    const fullUrl = `${baseurl}?${params.toString()}`

    fetch(API_URL + fullUrl)
        .then(r  => console.log(r))
        .catch(error => console.log('There was an error fetching the data:', error))
}


export function GET_DATA_BY_AGE_TEST(objectParam){
    const baseurl = '/api/consumption/by_age';
    const params = new URLSearchParams({
        age_range: "18-24",
        drug: "meth"
    })

    const fullUrl = `${baseurl}?${params.toString()}`

    fetch(API_URL + fullUrl)
        .then(r  => console.log(r))
        .catch(error => console.log('There was an error fetching the data:', error))
}

