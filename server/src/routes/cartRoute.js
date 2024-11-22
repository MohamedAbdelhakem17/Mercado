const express = require("express");
const CartController = require("../controller/cartController");

const router = express.Router();

router
    .route("/")
    .get(CartController.getLoggedUserCart)
    .post(CartController.addProductToCart);

router
    .route("/item/:itemId")
    .put(CartController.updateCartItemQuantity)
    .delete(CartController.removeItemFromCart);

router.delete("/:cartId", CartController.deleteUserCartItem);

router.put("/applyCoupon", CartController.applyCouponToUserCart);

module.exports = router;
