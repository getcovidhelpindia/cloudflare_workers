/**
 * Fetches list of all KV pairs from a namespace that satisfy a prefix
 * @param {NAMESPACE} kv - The Cloudflare worker KV in which to search for data, defined in wrangler.toml file
 * @param {String} prefix - Prefix of the key by which it should fetch the KV pairs
 * @returns {Array<JSON>} List of all KV pairs satisfying the condition
 */
const fetchKvMultiple = async (kv, prefix) => {
    const keys = await kv.list({ "prefix": prefix })
    const kvPromises = keys.keys.map(key => kv.get(key.name, { type: "json" }));
    let kvValues = await Promise.all(kvPromises);
    return kvValues
}

export default fetchKvMultiple