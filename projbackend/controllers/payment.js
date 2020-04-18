var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "548r8ymxqr75c4gw",
    publicKey: "smdsb74d88ywdc7n",
    privateKey: "f0dfc14ac9178434ec9bd1551d80e04b",
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amount = req.body.amount;
    gateway.transaction.sale(
        {
            amount: amount,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true,
            },
        },
        function (err, result) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(result);
            }
        }
    );
};
