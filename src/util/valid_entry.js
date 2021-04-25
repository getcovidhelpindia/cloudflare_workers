/**
 * Function to verify the necessary fields are available for making a valid data entry.
 *  Currently form body validation is hardcoded. This is because using node modules with cloud workers
 *  is a pain. A better method to achieve this is desirable
 * 
 * @param {JSON} body - Body received in Request
 * @returns {boolean} - Whether the body has the required fields or not
 */
const validEntry = body =>
    body.hasOwnProperty('type')
    && body.hasOwnProperty('state')
    && body.hasOwnProperty('district')

export default validEntry