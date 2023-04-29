import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors';

dotenv.config();


const app = express();

//database config
connectDB();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</>")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white);
});