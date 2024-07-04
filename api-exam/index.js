const express = require('express');
const app = express();

const exam = require('./routes/exam');
const branch = require('./routes/branch');
const course = require('./routes/course');

const connect = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');

app.get('/', (req, res)=> {
    res.end("We are on server");
})
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(exam);
app.use(branch);
app.use(course);

connect();


app.listen(3001, (err)=> {
    if(err) {
        console.log(err);
    } else {
        console.log("Server is running on  3001....");
    }
})