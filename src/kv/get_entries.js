import fetchKvMultiple from '../util/fetch_kv_multiple'
import invalid from '../util/responses'
import validQuery from '../util/valid_query'

/**
 * Get entries depending on prefix and type
 * @param {Request} request - Request received by the worker
 * @returns {Response} - A JSONarray of all KV pairs of a particular type and satisfying the prefix
 */

const getEntries = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text()) 

    // TODO currently form body validation is hardcoded. This is because using node modules with cloud workers
    // is a pain. A better method to achieve this is desirable
    if (!validQuery(body))
        return invalid()
    let values
    // type = 0 => oxygen
    // type = 1 => medicine
    // type = 2 => plasma
    // type = 3 => bed
    // type = 4 => testing
    switch (body['type']) {
        case 0:
            values = await fetchKvMultiple(OXYGEN, body['prefix'])
            break
        case 1:
            values = await fetchKvMultiple(MEDICINE, body['prefix'])
            break
        case 2:
            values = await fetchKvMultiple(PLASMA, body['prefix'])
            break
        case 3:
            values = await fetchKvMultiple(BED, body['prefix'])
            break
        case 4:
            values = await fetchKvMultiple(TESTING, body['prefix'])
            break
        default:
            return invalid()
    }

    return new Response(JSON.stringify({
        "success": true,
        "data": values
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': "*",
        }
    })
}

export default getEntries