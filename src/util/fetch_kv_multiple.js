const fetchKvMultiple = async(kv, prefix) => {
    const keys = await kv.list({ "prefix": prefix })
    const kvPromises = keys.keys.map(key => kv.get(key.name, { type: "json" }));
    let kvValues = await Promise.all(kvPromises);
    return kvValues
}

export default fetchKvMultiple