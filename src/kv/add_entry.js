import pushKV from '../util/push_kv'
import uid from '../util/uid'

const addEntry = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text())
    const data = JSON.stringify(body)
    const key = (body['state'] + "_" + body['district'] + "_" + uid(16)).toLowerCase()
        // id = 1 => medicine
        // id = 2 => plasma
        // id = 3 => bed
        // id = 4 => testing
    switch (body['type']) {
        case '1':
            await pushKV(MEDICINE, key, data)
            break
        case '2':
            await pushKV(PLASMA, key, data)
            break
        case '3':
            await pushKV(BED, key, data)
            break
        case '4':
            await pushKV(TESTING, key, data)
            break
        default:
            return new Response("Invalid id", {
                status: 200,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Cache-Control': 'no-store',
                }
            })

    }

    return new Response(key + ' was successfully added', {
        status: 200,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'no-store',
        }
    })
}

export default addEntry