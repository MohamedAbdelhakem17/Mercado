const asyncHandler = require("express-async-handler")

const { httpStatus } = require("../config/systemVariables");
const cartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const CouponModel = require("../models/couponModel")
const AppError = require("../util/appError");

const calcCartItemQuantity = (cart) => cart.reduce((acc, result) => acc + result.quantity, 0);

const calcTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItem.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
    });
    cart.totalPrice = totalPrice.toFixed(2);
    cart.totalPriceAfterDiscount = undefined;
}

exports.getLoggedUserCart = asyncHandler(
    async (req, res) => {
        const user = req.user._id;

        const userCart = await cartModel.findOne({ user })

        if (!userCart) throw new AppError("Not Found Cart for this User ", 404, httpStatus.FAIL)

        if (userCart.cartItem.length === 0) res.status(200).json({ status: httpStatus.SUCCESS, data: "No Product in This Cart" })

        const data = {
            ...userCart._doc,
            totalCartQuantity: calcCartItemQuantity(userCart.cartItem)
        }

        res.status(200).json({ status: httpStatus.SUCCESS, data })
    }
)

exports.addProductToCart = asyncHandler(
    async (req, res) => {
        const { product, color, size, quantity = 1 } = req.body;
        const user = req.user._id
        const selectProduct = await ProductModel.findById(product)
        let userCart = await cartModel.findOne({ user })


        if (!userCart) {
            // 1 user not have Cart ant it First item 
            userCart = await cartModel.create({
                cartItem: { product, color, size, quantity, price: selectProduct.price }, user
            })
        } else {
            const productIsExist = userCart.cartItem.findIndex(currentValue => currentValue.product === product && currentValue.color === color)
            // 2 user add Product exist 
            if (productIsExist === -1) userCart.cartItem[productIsExist].quantity += quantity
            // 3- user add item but with deferent color
            else userCart.cartItem.push({ product, color, size, quantity, price: selectProduct.price });
        }

        userCart.totalPrice = calcTotalPrice(userCart)
        await userCart.save()
        res.status(201).json({ statusL: httpStatus.SUCCESS, data: userCart.cartItem })
    }
)

exports.deleteUserCartItem = asyncHandler(
    async (res, req) => {
        const { cartId } = req.params;
        const user = req.user._id

        const userCart = cartModel.findOneAndDelete({ _id: cartId, user })

        if (!userCart) throw new AppError("Not Found Cart for this User ", 404, httpStatus.FAIL)

        res.status(200).json({ status: httpStatus.SUCCESS, data: null })
    }
)


exports.updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const user = req.user._id;

    const userCart = await cartModel.findOne({ user });

    if (!userCart) throw new AppError(404, httpStatus.FAIL, "This user doesn't have a cart.");

    const productIndex = userCart.cartItem.findIndex((currentValue) => currentValue._id === itemId);

    if (productIndex === -1) throw new AppError(404, httpStatus.FAIL, "This item doesn't exist in the cart.");

    userCart.cartItem[productIndex].quantity = quantity;

    calcTotalPrice(userCart);
    await userCart.save();

    res.status(200).json({ status: httpStatus.SUCCESS, data: userCart.cartItem });
});


exports.applyCouponToUserCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const currentDate = Date.now();

    const coupon = await CouponModel.findOne({
        name: req.body.coupon,
        expired: { $gte: currentDate },
    });

    if (!coupon) throw new AppError(400, httpStatus.FAIL, "Invalid or expired coupon. Please check your coupon details.");


    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) throw new AppError(404, httpStatus.FAIL, "User cart not found. Please make sure the cart exists.");

    userCart.totalPriceAfterDiscount = (userCart.totalPrice - (userCart.totalPrice * coupon.discount) / 100).toFixed(2);

    await userCart.save();
    const data = { ...userCart._doc, totalItemInCart: calcCartItemQuantity(userCart) };

    res.status(200).json({ status: httpStatus.SUCCESS, data });
});

exports.removeItemFromCart = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const user = req.user._id;

    const userCart = await cartModel.findOneAndUpdate(
        { user },
        { $pull: { cartItem: { _id: itemId } } },
        { new: true }
    );

    if (!userCart) {
        throw new AppError(404, httpStatus.FAIL, "This user doesn't have a cart.");
    }

    calcTotalPrice(userCart);

    const data = {
        ...userCart._doc,
        totalItemInCart: calcCartItemQuantity(userCart),
    };

    res.status(200).json({ status: httpStatus.SUCCESS, data });
});