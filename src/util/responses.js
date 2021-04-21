const invalid = () => new Response(JSON.stringify({
    "success": "false",
    "data": "Invalid"
}), {
    status: 200,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': "*",
    }
})

export default invalid