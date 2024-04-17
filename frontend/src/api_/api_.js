
//url api
const API_URL = "http://127.0.0.1:8000/"

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


export function GET_CONSUMPTION_DATA(objectParam, urlParam){
    const baseurl = '/api/consumption/' + urlParam;

    const fullUrl = `${baseurl}?${objectParam.toString()}`

    fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('There was an error fetching the data:', error);
        });
}

export function GET_DATA_BY_GENDER_TEST(objectParam){
    const baseurl = '/api/consumption/by_gender';
    const params = new URLSearchParams({
        gender: "female",
        drug: "alcohol"
    })

    const fullUrl = `${baseurl}?${params.toString()}`

    fetch(fullUrl)
        .then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('There was an error fetching the data:', error);
        });
}
