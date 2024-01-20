const express= require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000
// const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongoose');

//connect to Database 
connectDB()
    .then(() => {
    // Start your server after successfully connecting to the database
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Terminates the process if the database connection fails
    });

app.use(
    cors({
        credentials: true,
        origin : 'http://localhost:5173'
    }),
    express.json(),
    express.urlencoded({extended: true}),
    // cookieParser() 
    )
connectDB();

//import routes here
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);
