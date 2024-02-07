import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please fill in all fields!!!' ,success:false});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters!!!',success:false });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password confirmation does not match!!!' ,success:false});
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!!!' ,success:false});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result, token ,success:true,message:'Account created successfully!!!'});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!!!',success:false});
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields!!!',success:false});
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist!!!' ,success:false});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials!!!' ,success:false});
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token,success:true,message:'Logged in successfully!!!'});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!!!',success:false });
    }
}

