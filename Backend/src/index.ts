import express, {Request, Response} from 'express';
const app = express();
const port = 3000;

app.get('/api/boards', (req : Request, res : Response) =>{
    res.send("hello world")
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})