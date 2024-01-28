const express= require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(
    cors({
        credentials: true,
        origin : 'http://localhost:3000'
    }),
    express.json(),
    express.urlencoded({extended: true}),
    cookieParser(),
    )
//Connect To Database 
connectDB()
    .then(() => {
    // Start server after successfully connecting to the database
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Terminates the process if the database connection fails
    });


//Imported Routes
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', appointmentRoutes)

