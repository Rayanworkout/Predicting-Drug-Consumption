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
export function GET_DATA_BY_DRUG_ORDER_BY_AGE(age, drug){
    const baseurl = '/api/consumption/by_age';
    const params = new URLSearchParams({
        age_range: age,
        drug:drug
    })
    const fullUrl = `${baseurl}?${params.toString()}`
    fetch(PREFIX_API_URL + fullUrl)
        .then(r  => console.log(r))
        .catch(error => console.log('There was an error fetching the data:', error))
}

