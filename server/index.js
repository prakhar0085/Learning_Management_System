// import express from "express"
// import dotenv from "dotenv"
// import connectDb from "./configs/db.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import routes from "./routes/index.js"
// dotenv.config()

// const port = process.env.PORT || 8000
// const app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin:["http://localhost:5173", "http://localhost:5174"],
//     credentials:true
// }))

// app.use("/api", routes)

// app.get("/" , (req,res)=>{
//     res.send("Hello From Server")
// })

// app.use((err, req, res, next) => {
//     console.error("[Chatbot API Error]", err)
//     const status = err.statusCode || 500
//     res.status(status).json({
//         message: err.message || "Internal server error.",
//     })
// })

// app.listen(port , ()=>{
//     console.log(`Server Started on port ${port}`)
//     connectDb()
// })

import express from 'express';
import dotenv from 'dotenv';
import connectDb from './configs/db.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import courseRouter from './routes/courseRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import aiRouter from './routes/aiRoute.js';
import reviewRouter from './routes/reviewRoute.js';
dotenv.config();

let port = process.env.PORT;
let app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   }),
// );


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://51.20.148.95:5173"
  ],
  credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/ai', aiRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
  res.send('Hello From Server');
});

app.listen(port, () => {
  console.log('Server Started');
  connectDb();
});
