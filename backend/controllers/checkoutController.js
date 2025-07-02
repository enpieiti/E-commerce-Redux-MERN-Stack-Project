const express = require("express");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkout" });
  }

  try {
    // create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
const markAsPaid = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createCheckout,
  markAsPaid,
  finalizeCheckout,
};

const checkoutData = {
  _id: "683d55375489e19c71c2d18b",
  user: "68348042d3253c1e6ddb0484",
  checkoutItems: [
    {
      productId: "68348042d3253c1e6ddb04be",
      name: "High-Rise Joggers",
      image: "https://res.cloudinary.com/dw4bf6u8r/image/upload/v1748317330/p429ize49uzntxzrvvyz.jpg",
      price: 40,
      quantity: 1,
      size: "S",
      color: "Pink",
    },
    {
      productId: "68348042d3253c1e6ddb0492",
      name: "Slim-Fit Easy-Iron coats",
      image: "https://res.cloudinary.com/dw4bf6u8r/image/upload/v1748316132/s4mcw6rsz43vckw3zsyi.jpg",
      price: 34.99,
      quantity: 1,
      size: "L",
      color: "Chocolate",
    },
  ],
  shippingAddress: {
    firstName: "John",
    lastName: "Doe",
    address: "123 Main Street",
    city: "New York",
    postalCode: "10001",
    country: "USA",
    phone: 12345678,
  },
  paymentMethod: "Paypal",
  totalPrice: 74.99,
  isPaid: true,
  paymentStatus: "paid",
  isFinalized: true,
  createdAt: "2025-06-02T07:39:35.055Z",
  updatedAt: "2025-06-02T07:59:57.282Z",
  paidAt: "2025-06-02T07:59:57.005Z",
  finalizedAt: "2025-06-02T07:59:57.282Z",
  __v: 0,
  paymentDetails: {
    id: "2P4872664X8138230",
    intent: "CAPTURE",
    status: "COMPLETED",
    purchase_units: [
      {
        reference_id: "default",
        amount: {
          currency_code: "USD",
          value: "74.99",
        },
        payee: {
          email_address: "sb-m0tig42276679@business.example.com",
          merchant_id: "TDPJS6R5RKSJ6",
        },
        soft_descriptor: "PAYPAL *TEST STORE",
        shipping: {
          name: {
            full_name: "John Doe",
          },
          address: {
            address_line_1: "1 Main St",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
        },
        payments: {
          captures: [
            {
              id: "15Y53199K50514154",
              status: "COMPLETED",
              amount: {
                currency_code: "USD",
                value: "74.99",
              },
              final_capture: true,
              seller_protection: {
                status: "ELIGIBLE",
                dispute_categories: ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"],
              },
              create_time: "2025-06-02T07:59:55Z",
              update_time: "2025-06-02T07:59:55Z",
            },
          ],
        },
      },
    ],
    payer: {
      name: {
        given_name: "John",
        surname: "Doe",
      },
      email_address: "sb-wh8c042231186@personal.example.com",
      payer_id: "DF5PUF8VGMS28",
      address: {
        country_code: "US",
      },
    },
    create_time: "2025-06-02T07:59:34Z",
    update_time: "2025-06-02T07:59:55Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v2/checkout/orders/2P4872664X8138230",
        rel: "self",
        method: "GET",
      },
    ],
  },
};
