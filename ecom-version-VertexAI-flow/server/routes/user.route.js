import express from 'express'
import {getCart, addProductToCart, removeProductFromCart, updateProductQuantity} from '../controllers/user.controller.js'

const router = express.Router()

router.get('/cart/:email', getCart)
router.post('/cart/:email/:productId', addProductToCart)
router.delete('/cart/:email/:productId', removeProductFromCart)
router.put('/cart/:email/:productId', updateProductQuantity)

export default router