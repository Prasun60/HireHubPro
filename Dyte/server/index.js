const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logsRoutes = require('./routes/logsroutes');

const app = express();
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/logs", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected to database!");
}).catch(()=>{
    console.log("Connection failed!");
}); 


app.use('/api/logs', logsRoutes);



app.listen(3000, () => {
    console.log('Server started at port 3000!');
}
);
