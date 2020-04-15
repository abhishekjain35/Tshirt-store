const stripe = require("stripe")("sk_test_OU1PoSqcxDYInMz9TpR7fnWh008263sQ1z");
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
                        amount: amount * 100,
                        currency: "usd",
                        customer: customer.id,
                        receipt_email: token.email,
                        description: "A Test Account",
                        shipping: {
                            name: token.card.name,
                            address: {
                                line1: token.card.address_line1,
                                city: token.card.address_city,
                                country: token.card.address_country,
                                postal_code: token.card.address_zip,
                            },
                        },
                    },
                    { idempotencyKey }
                )
                .then((result) => res.status(200).json(result))
                .catch((err) => console.log(err));
        });
};
