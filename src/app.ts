import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
