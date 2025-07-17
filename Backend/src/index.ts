import express from 'express';
import boardRouter from './routes/boardRoutes';
import { errorHandler } from './middlewares/errorHandling.middleware';
const app = express();
const port = 3000;


app.use('/v1/board', boardRouter)

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
});
