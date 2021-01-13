const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const loginValidation = require('./middlewares/validation.login');
const fs = require('fs');
const router = require('./routes/auth.route');
const CONSTANT = require('./utils/constant');
var bodyParser = require('body-parser');

app.use(cors());

// app.use('/public', express.static(__dirname + '/fileUpload'));
app.use('/public', express.static('public')); 
app.use(bodyParser({limit: '1tb'}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', loginValidation(), require('./routes/user.route'));
app.use('/api/category', loginValidation(), require('./routes/category.route'));
app.use('/api/course', loginValidation(), require('./routes/course.route'));
app.use('/api/course/video', loginValidation(), require('./routes/coursevideo.route'));



app.post('/uploadFile', (req, res, next) => {
  let publicPath = path.dirname(require.main.filename) + '/public/';
  
  fs.writeFile(publicPath + req.body.fileName,  req.body.data, "binary", function (err) {
    if (err) {
      res.status(500).json({
        message: CONSTANT.ERRORS.SYSTEM_ERROR
      })
    } else {
      res.json({
        message: 'Success'
      })
    }
  });
});

//error handler
app.use((err, req, res, next) => {
  console.info("Error occurs: ", err);
  res.status(500).json({
    message: "Something wrong, please contact administrators for more information!"
  })
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Sakila backend api is running at http://localhost:${PORT}`);
});