import addEntry from './kv/add_entry'

addEventListener('fetch', function(event) {
    const { request } = event
    const response = handleRequest(request).catch(handleError)
    event.respondWith(response)
})

async function handleRequest(request) {
    const { method, url } = request
    const { host, pathname } = new URL(url)

    switch (pathname) {
        case '/':
        case '/addData':
            return addEntry(request)
                // case '/getData':
                //     return getData(request)
    }
    // Workers on these hostnames have no origin server,
    // therefore there is nothing else to be found
    if (host.endsWith('.workers.dev') ||
        host.endsWith('.cloudflareworkers.com')) {
        return new Response('Not Found', { status: 404 })
    }

    // Makes a fetch request to the origin server
    return fetch(request)
}

function handleError(error) {
    console.error('Uncaught error:', error)

    const { stack } = error
    return new Response(stack || error, {
        status: 500,
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    })
}