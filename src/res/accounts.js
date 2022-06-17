const client = require('../client');

module.exports.getAccount = async () => {
    return client.execute('GET', '/v2/accounts/current');
};