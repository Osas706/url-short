const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors')
const app = express();


//connect to database
connectDB();

app.use(express.json({ extended: false}));
app.use(cors())

//define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));