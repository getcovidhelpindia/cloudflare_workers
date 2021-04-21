const validQuery = body => body.hasOwnProperty('type') && body.hasOwnProperty('prefix')

export default validQuery