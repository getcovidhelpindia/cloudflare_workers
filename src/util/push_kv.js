/**
 * Push a single KV pair to worker KV namespace
 * @param {NAMESPACE} kv - The Cloudflare worker KV in which to search for data, defined in wrangler.toml file
 * @param {String} key - Key to which the data will be associated in the database
 * @param {JSON} data - Data to be put in the database
 * @returns Nothing
 */
const pushKV = async (kv, key, data) => await kv.put(key, data)

export default pushKV