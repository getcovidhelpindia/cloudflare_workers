import pushKV from '../util/push_kv'
import uid from '../util/uid'
import validEntry from '../util/valid_entry'
import invalid from '../util/responses'

/**
 * Adds an entry to the respective namespace. This endpoint is only for adding data for public.
 * Data added via this API is subject to moderation
 * @param {Request} request - Request received by the worker
 * @returns {Response} If the data is added successfully, then it returns the key of 
 * the respective data that it was added under
 */
const addEntry = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text())
    if (!validEntry(body))
        return invalid()
    const key = (body['state'] + "_" + body['district'] + "_" + uid(16)).toLowerCase()
    body['key'] = key
    // 'isApproved' is false as the data added via this API is subject to moderation
    body['isApproved'] = false
    body['verifiedAt'] = ""
    body['createdAt'] = new Date()
    body['isHidden'] = false
    const data = JSON.stringify(body)
    // type = 0 => oxygen
    // type = 1 => medicine
    // type = 2 => plasma
    // type = 3 => bed
    // type = 4 => testing
    switch (body['type']) {
        case 0:
            await pushKV(OXYGEN, key, data)
            break
        case 1:
            await pushKV(MEDICINE, key, data)
            break
        case 2:
            await pushKV(PLASMA, key, data)
            break
        case 3:
            await pushKV(BED, key, data)
            break
        case 4:
            await pushKV(TESTING, key, data)
            break
        default:
            return invalid()

    }

    return new Response(JSON.stringify({
        "success": true,
        "data": key + ' was successfully added' //
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': "*",
        }
    })
}

export default addEntry