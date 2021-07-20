import React, { useState } from "react";
import { API } from "../backend";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/orderHelper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Paymentr = ({ products, setReload = (f) => f, reload = undefined }) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const useremail = isAuthenticated() && isAuthenticated().user.email;
  const token = isAuthenticated() && isAuthenticated().token;
  const [instruction, setInstruction] = useState("");
  const [branch, setBranch] = useState("");
  const [number, setNumber] = useState("");
  // eslint-disable-next-line
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    instance: {},
  });
  // eslint-disable-next-line
  const [name, setName] = useState("");
  const getAmount = () => {
    let amount = 0;
    // eslint-disable-next-line
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const paymentData = {
    amount: getAmount() * 100,
  };

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(`${API}/razorpay/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_TtHiyQQU1R6qnb",
      currency: "INR",
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Maa Cakemalai",
      description: "Thank you for shopping!",
      // image: `${API}/logo.svg`,
      handler: function (response) {
        alert("Payment Successful! We have received your order.");

        const orderData = {
          products: products,
          transaction_id: data.id,
          amount: data.amount,
          instruction: instruction,
          branch: branch,
          number: number,
        };
        createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });

        setReload(!reload);
      },
      prefill: {
        contact: `+91${number}`,
        email: useremail,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const handlechange = (event) => {
    setInstruction(event.target.value);
  };

  const handlechangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const handlechangeNumber = (event) => {
    setNumber(event.target.value);
  };
  return (
    <div>
      {products.length > 0 ? (
        <>
          <form className="p-1">
            <span className="h4 text-center">Enter your details:</span>
            <div className="my-2 ">
              <input
                type="number"
                className=" form-control my-2  p-2 "
                onChange={handlechangeNumber}
                value={number}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="form-group my-2">
              <select
                onChange={handlechangeBranch}
                className="form-control"
                placeholder="Select Branch"
              >
                <option disabled selected>
                  Select Branch
                </option>

                <option value="Dhamtari">Dhamtari</option>
                <option value="Rudri">Rudri</option>
                <option value="Kurud">Kurud</option>
              </select>
            </div>
            <textarea
              type="text"
              className=" form-control my-2  p-2 "
              onChange={handlechange}
              value={instruction}
              placeholder="Want to give any instructions or message on cake"
            />
          </form>
          <h3 className="my-1 p-2">
            Your bill is <strong>₹{getAmount()}</strong>{" "}
          </h3>
          {!isAuthenticated() && (
            <>
              <h2 className="headingalt my-2 p-1">
                Please{" "}
                <Link to="/signin" className="text-dark font-weight-bold">
                  <p className="btn-info btn btn mt-3"> Sign In</p>
                </Link>{" "}
                to Checkout
              </h2>
            </>
          )}{" "}
          {isAuthenticated() && (
            // eslint-disable-next-line
            <div>
              <button
                className="my-3 submitbtn p-3"
                onClick={displayRazorpay}
                target="_blank"
              >
                <strong>Proceed to Checkout</strong>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="cartpage">
          <h5 className="mt-4">
            If you have already placed an order, then{" "}
            <a href={`/myprofile/orders`} className="btn btn-info p-1 my-1">
              <span>click here</span>
            </a>{" "}
            to get details.
          </h5>
        </div>
      )}
    </div>
  );
};

export default Paymentr;
