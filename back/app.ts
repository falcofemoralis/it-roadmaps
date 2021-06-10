import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRouter from './routers/userRouter';
import roadmapRouter from './routers/roadmapRouter';
import path from 'path';
import history from "connect-history-api-fallback";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/roadmaps", roadmapRouter)
app.use("/api/users", userRouter)
app.use(history());
app.use(express.static(path.join(__dirname, './files')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './files/index.html'));
});

mongoose.connect("mongodb://localhost:27017/it-roadmaps", { useUnifiedTopology: true, useNewUrlParser: true }, (err: any) => {
    if (err) {
        return console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
});

