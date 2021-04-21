import addEntry from './kv/add_entry'
import getEntries from './kv/get_entries'
import Sha256 from './util/sha';


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
            break
        case '/addData':
            return addEntry(request)
        case '/getData':
            return getEntries(request)
        case '/getHash':
            return new Response(JSON.stringify({
                "data": Sha256.hash("works", { msgFormat: 'string', outFormat: 'string' }),
                "success": "true"
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                    "Access-Control-Max-Age": "86400",

                }
            })
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