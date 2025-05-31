import express from 'express';
import cors from 'cors';
import transcribeRoute from './routes/transcribe.route';
import dotenv from 'dotenv';
import resultRoute from './routes/result.route';
dotenv.config();

const app = express();
const port = 9898;



app.use(cors());
app.use(express.json());


app.use('/api/result', resultRoute);

app.use('/api/transcribe', transcribeRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});