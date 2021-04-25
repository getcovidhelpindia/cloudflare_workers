/**
 * Function to generate pseuso-random alphanumeric strings.
 * Initial idea was to use a npm package like `crypto`, but getting 
 * node packages to work with cloudflare workers is a pain.
 * Use of a more accepted random string generator is welcome.
 * 
 * @param {number} length - length of random string to generate
 * @returns {String} - the generated random string
 */
const makeid = (length) => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export default makeid