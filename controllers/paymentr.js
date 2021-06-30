const Razorpay = require("razorpay");
const uuidv1 = require("uuid/v1");

const razorpay = new Razorpay({
  key_id: "rzp_test_TtHiyQQU1R6qnb",
  key_secret: "OEHRq4kIt8xn135qLZlBEPr2",
});

exports.processPayment = async (req, res) => {
  const totalamount = req.body.amount;
  const payment_capture = 1;
  //   const amount = 499;
  const currency = "INR";
  //   console.log(totalamount);
  const options = {
    amount: totalamount,
    currency,
    receipt: uuidv1(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verification = (req, res) => {
  // do a validation
  const secret = "manav777";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
};
