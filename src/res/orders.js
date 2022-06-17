const client = require('../client');

module.exports.createOrder = async (order_id,product) => {
    return client.execute('POST', `/v2/orders`, {
        allowPreOrder: false,
        orderId: order_id,
        products: [
            product
        ]
    });
};