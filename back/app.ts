import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRouter from './routers/userRouter';
import roadmapRouter from './routers/roadmapRouter';

const app = express();
const PORT = 3000;

app.use(cors())
app.use("/api/roadmap", roadmapRouter)
app.use("/api/user", userRouter)
app.get("/", (req, res) => { res.status(200).send("I am groot") })

mongoose.connect("mongodb://localhost:27017/testdb", { useUnifiedTopology: true, useNewUrlParser: true }, (err: any) => {
    if (err) {
        return console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
});

