import fetchKvMultiple from '../util/fetch_kv_multiple'

const getEntries = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text())
        // type = 1 => medicine
        // type = 2 => plasma
        // type = 3 => bed
        // type = 4 => testing
    let values
    switch (body['type']) {
        case '1':
            values = await fetchKvMultiple(MEDICINE, body['prefix'])
            break
        case '2':
            values = await fetchKvMultiple(PLASMA, body['prefix'])
            break
        case '3':
            values = await fetchKvMultiple(BED, body['prefix'])
            break
        case '4':
            values = await fetchKvMultiple(TESTING, body['prefix'])
            break
        default:
            return new Response("Invalid query", {
                status: 200,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Cache-Control': 'no-store',
                }
            })
    }

    return new Response(JSON.stringify(values), {
        status: 200,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-store',
        }
    })
}

export default getEntries