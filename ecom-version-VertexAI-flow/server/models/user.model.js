import mongoose from 'mongoose';
import Product from './product.model.js';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, required: true },
    cart : [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
    }],
    orders: [{
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        }],
        totalPrice: { type: Number },
        dateOrdered: { type: Date, default: Date.now },
    }],
});



const User = mongoose.model('User', userSchema);

export default User;