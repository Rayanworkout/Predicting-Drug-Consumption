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

