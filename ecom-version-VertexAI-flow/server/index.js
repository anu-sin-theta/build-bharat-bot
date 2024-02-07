import express from 'express'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import cors from 'cors'

const app = express()

app.use(cors())
dotenv.config()


app.use(express.json())

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    }
)}).catch(() => {
    console.log('Server Connect failure!!!');
})


// routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)




