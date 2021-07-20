const User = require("../models/user");
const Order = require("../models/order");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// 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

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with this email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter
          .sendMail({
            to: user.email,
            from: "no-reply@maacakemalai.com",
            subject: "Password reset",
            html: `
                <p>You requested for password reset</p>
                <h5>click on this <a href="/reset/${token}">link</a> to reset password</h5>
                `,
          })
          .catch((exception) => {
            console.log("handle error here: ", exception);
          });

        res.json({ message: "check your email" });
      });
    });
  });
};

exports.updateUser = (req, res) => {
  const password = req.body.password;
  bcrypt.hash(password, 12).then((hashedpassword) => {
    const user = {
      password: hashedpassword,
    };
    req.body.password = user.password;
  });
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      flavor: product.flavor,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store thi in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
