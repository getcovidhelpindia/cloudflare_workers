import pushKV from '../util/push_kv'
import uid from '../util/uid'
import validEntry from '../util/valid_entry'
import invalid from '../util/responses'

const addEntry = async(request) => {
    const headers = Object.fromEntries([...request.headers])
    const body = JSON.parse(await request.text())
    if (!validEntry(body))
        return invalid()
    console.log(validEntry(body))

    const key = (body['state'] + "_" + body['district'] + "_" + uid(16)).toLowerCase()
    body['key'] = key
    body['isApproved'] = false
    body['verifiedAt'] = ""
    body['createdAt'] = new Date()
    body['isHidden'] = true
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