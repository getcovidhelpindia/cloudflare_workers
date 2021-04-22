import fetchKvMultiple from '../util/fetch_kv_multiple'
import invalid from '../util/responses'
import validQuery from '../util/valid_query'

const getEntries = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text()) //JSON.parse(await request.text())
        // type = 0 => oxygen
        // type = 1 => medicine
        // type = 2 => plasma
        // type = 3 => bed
        // type = 4 => testing
    if (!validQuery(body))
        return invalid()
    let values
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