import User from '../models/user.model.js';
import Product from '../models/product.model.js';


// get cart of a user by email
export const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add product to cart
export const addProductToCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const product = await Product.findById(req.params.productId);
        const quantity = req.body.quantity;
        user.cart.push({ product, quantity });
        await user.save();
        res.status(200).json(user.cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// remove product from cart
export const removeProductFromCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        user.cart = user.cart.filter(item => item.product != req.params.productId);
        await user.save();
        res.status(200).json(user.cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update product quantity in cart
export const updateProductQuantity = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const product = user.cart.find(item => item.product == req.params.productId);
        product.quantity = req.body.quantity;
        await user.save();
        res.status(200).json(user.cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

