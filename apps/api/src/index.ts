import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 9898;

app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'X-Signature'],
  })
);

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
