const invalid = () => new Response("Invalid", {
    status: 200,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-store',
    }
})

export default invalid