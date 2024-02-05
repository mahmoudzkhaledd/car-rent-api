const express = require('express');
const app = express();
require('dotenv').config();
const configDbConnection = require('./Configs/DB_Config');
const errorHandeler = require('./Error_Handeler/ErrorsHandelerModule');
const appRoute = require('./Features/AppRoutes');
const PORT = process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
 
app.use(cors({
  origin: [
    'http://localhost:3001',
    "https://car-dashboard-one.vercel.app",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 350,
  message: "Too many requests, please try again after 15 mins",
});

app.use(limiter);

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(hpp());
app.use(sanitize());
app.use(xss());

configDbConnection();

app.use(appRoute);
app.all('*', (req, res, next) => {
  return res.status(404).json({
    "State": "Can't find this route !",
  });
});
const server = app.listen(PORT, () => {
  console.log(`listen to http://localhost:${PORT}/`)
});

app.use(errorHandeler);
process.on('unhandledRejection', (error) => {
  console.log(`Unhandeled Exeption ${error}`);
  // process.exit(1)
});
