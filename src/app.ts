import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import winston from 'winston';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import routes from './routes'; 

(async () => {
  const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  dotenv.config({ path: envFile });

  const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: () => format(new Date(), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
      }),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()]
  });

  const app = express();
  app.use(morgan("dev", { stream: { write: message => logger.info(message.trim()) } }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', routes);  

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server started on port ${port}. Ready to handle requests.`);
  });
})();
