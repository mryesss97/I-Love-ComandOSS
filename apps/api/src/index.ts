const express = require('express');
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from API 👋');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});