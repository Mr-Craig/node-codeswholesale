const codeswholesale = require('../index');

codeswholesale.configure({
    client_id: '',
    client_secret: ''
});

codeswholesale.accounts.getAccount().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

codeswholesale.products.getProduct("416c7de8-ec95-43d6-92b4-f024e9acd121").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

codeswholesale.orders.createOrder("fart", {
    productId: "416c7de8-ec95-43d6-92b4-f024e9acd121",
    quantity: 1
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})