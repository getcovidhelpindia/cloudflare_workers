export const notFoundResponse = () =>
    new Response('not found', {
        headers: { 'content-type': 'text/html' },
        status: 404,
    })