import express from 'express';
import router from "./routes/words";
import cors from "cors";

const app = express();
const PORT = 8000;

if(!process.env.FRONTEND_URL) throw new Error('FRONTEND_URL is note set in .env file');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api/words', router)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});