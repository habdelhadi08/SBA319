import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import airlinesRouter from './routes/airlines.js';
import airportsRouter from './routes/airports.js';

// inits the dotenv package
dotenv.config();

// App port
const PORT = process.env.PORT || 4000;

// express app
const app = express();

// ================ Middlewares =====================

// JSON Parser
app.use(express.json());
// custom logger middleware
app.use((req, res, next) => {
    console.log("Request from url: " + req.url);
    next();
});


// =============== Routes ============================== 
/**
 * GET
 */
// app.get('/', (req, res) => {
//     console.log(req.body);
//     res.send('Welcome to the API!!');
// });


app.use('/users', usersRouter);
app.use('/airlines', airlinesRouter);
app.use('/airports', airportsRouter);



// Global error handler middleware
app.use((err, _req, res, next) => {
    res.status(500).send('Server Error!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});