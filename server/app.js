// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// local imports
import routes from './routes/index';
import db from './db/index';
import middlewares from './middlewares';

// variables
dotenv.config();
const baseUrl = '/api/v1';
const PORT = process.env.PORT || 3000;

// removes whitespace from payload
const { trimmerMiddleware } = middlewares;

// initialize express server
const app = express();

// Middlewares
app.use(express.json());
app.use(trimmerMiddleware);
app.use(cors());
app.use(compression()); // Compress all routes
app.use(helmet()); // Security middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes with base URl
app.use(`${baseUrl}`, routes);

app.get('/', (req, res) => {
  res.status(200).json({
    error: 'Welcome to LSM API',
  });
});

// catch invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

// connect to database server and start application server
db.connect().then(async () => {
  if (!module.parent) {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log('Application listening in port ', PORT));
  }
});

export default app;
