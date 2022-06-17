const client = require('../client');

module.exports.getProduct = async (product_id) => {
    return client.execute('GET', `/v2/products/${product_id}`);
};