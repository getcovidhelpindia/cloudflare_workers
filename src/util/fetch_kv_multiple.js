const fetchKvMultiple = async(kv, prefix) => {
    const keys = await kv.list({ "prefix": prefix })
    console.log(keys.keys)
    const kvPromises = keys.keys.map(key => kv.get(key.name, { type: "json" }));
    let kvValues = await Promise.all(kvPromises);
    console.log(kvValues)
    return kvValues
}

export default fetchKvMultiple