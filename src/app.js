const express = require('express');
const app = express();
const dbsetup = require('./database/setup');
const bookRoute = require('./routes/bookRoute');
const authRoute = require('./routes/authRoute');
const port = process.env.Port || 4000;

//Setup database
dbsetup();

//Setup json middleware
app.use(express.json());

//Setup route
app.use(bookRoute);
app.use(authRoute);

app.listen(port, () => {
    console.log(`server created on port ${port}`);
})