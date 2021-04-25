/**
 * Function to verify if the necessary fields are present to make a legitimate data fetch query
 * 
 * Currently form body validation is hardcoded. This is because using node modules with cloud workers
 * is a pain. A better method to achieve this is desirable
 * @param {JSON} body - Body received in Request
 * @returns {boolean} - Whether the body has the required fields or not
 */
const validQuery = body => body.hasOwnProperty('type') && body.hasOwnProperty('prefix')

export default validQuery