const express = require('express');
const cors = require('cors');
const multer  = require('multer')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  const name = req.file.originalname
  const type = req.file.mimetype
  const size = req.file.size

  res.json({
    name: name,
    type: type,
    size: size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
