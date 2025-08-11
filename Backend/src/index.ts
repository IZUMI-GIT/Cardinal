import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import boardRouter from './routes/board.routes';
import { errorHandler } from './middlewares/errorHandling.middleware';
import authRouter from './routes/auth.routes';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}))

app.use('/v1', authRouter)
app.use('/v1/board',authMiddleware, boardRouter)

// app.get('/', (req,res) => {
//     console.log("Working")
//     res.status(200).json({
//         message : "Working"
//     })
// })

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
});
