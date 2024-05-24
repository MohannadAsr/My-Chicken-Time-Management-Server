const express = require('express'); // Express

// importing the routers for each route

const cors = require('cors');
const usersRouter = require('./routes/usersRouter');
const timeRouter = require('./routes/timeSlotsRouter');
const resetRouter = require('./routes/resetRouter');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
// Define the Server
const app = express();

app.use(cors());
// MiddleWares
app.use(express.json()); //  Avoid undefined Post req.body [bodyParser]

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Normal Get Request
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my Server',
    app: 'My Chicken Time Management',
  });
});

app.use('/users', usersRouter);
app.use('/timeSlots', timeRouter);
app.use('/resetdatabase', resetRouter);

// All Unhandled Routes [Must be the last Route or it will be handled no matter what is the req url]
app.all('*', (req, res, next) => {
  next(new AppError(`Could Not Found ${req.originalUrl} on this server`, 404));
});

// Error Handling MiddleWare
app.use(globalErrorController);

module.exports = app;
