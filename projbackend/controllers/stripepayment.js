const stripe = require("stripe")("SECRET_KEY");
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
    const { products, token } = req.body;
    let amount = 0;
    products.map((p) => (amount += p.price));

    const idempotencyKey = uuid();
    return stripe.customers
        .create({
            email: token.email,
            source: token.id,
        })
        .then((customer) => {
            stripe.charges
                .create(
                    {
                        amount: amount,
                        currency: "usd",
                        customer: customer.id,
                        receipt_email: token.email,
                        shipping: {
                            name: token.card.name,
                        },
                    },
                    { idempotencyKey }
                )
                .then((result) => res.status(200).json(result))
                .catch((err) => console.log(err));
        });
};
