import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id:{type: Number, required: true, unique: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    images: { type: Array, default: [] }
});

const Product = mongoose.model('Product', productSchema);

export default Product;