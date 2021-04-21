const validEntry = body => body.hasOwnProperty('type') && body.hasOwnProperty('state') && body.hasOwnProperty('district')

export default validEntry