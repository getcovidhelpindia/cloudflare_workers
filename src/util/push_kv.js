const pushKV = async(kv, key, data) => await kv.put(key, data)

export default pushKV