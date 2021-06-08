import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRouter from './routers/userRouter';
import roadmapRouter from './routers/roadmapRouter';

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/roadmaps", roadmapRouter)
app.use("/api/users", userRouter)

mongoose.connect("mongodb://localhost:27017/it-roadmaps", { useUnifiedTopology: true, useNewUrlParser: true }, (err: any) => {
    if (err) {
        return console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
});

