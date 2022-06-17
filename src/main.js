const client = require('./client');

module.exports = {
    configure: client.configure,
    accounts: require('./res/accounts'),
    products: require('./res/products'),
    orders: require('./res/orders')
};