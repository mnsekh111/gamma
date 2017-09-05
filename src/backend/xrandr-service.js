const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').exec
const info = require('./xrandr-extract.js')
const saveFilePath = '../.config/gamma_start.json'

fs.access(saveFilePath, function (err) {
  if (err) {
    fs.writeFile(saveFilePath, '{}', function (err) {
      if (!err) {
        console.log('OK: ' + saveFilePath + ' created')
      } else {
        console.log('ERR: ' + saveFilePath + ' cannot be created ' + err)
      }
    })
  } else {
    console.log('OK: ' + saveFilePath + ' present')
  }
})

app.use(cors())
app.use(bodyParser.json())

app.get('/displays', function (req, res) {
  info.getDisplays(function (result) {
    info.getDisplays(function (displays) {
      // console.log(displays)
      res.json(result)
    })
  })
})

app.post('/displays', function (req, res) {
  console.log(req.body)
  var data = {}
  fs.readFile(saveFilePath, 'utf8', function (err, buffer) {
    if (err) {
      console.log('ERR: ' + saveFilePath + ' cannot be read')
    } else {
      data = JSON.parse(buffer)
      data[req.body['name']] = req.body
      console.log(data)
      fs.writeFile(saveFilePath, JSON.stringify(data), function (err) {
        if (!err) {
          // executeXrandr(req.body);
          console.log('OK: ' + saveFilePath + ' saved.')
        } else {
          console.log('ERR: ' + saveFilePath + ' cannot be saved ' + err)
        }
      })
      console.log('Parsed data' + data)
    }
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  info.getDisplays(function (result) {
    info.getDisplays(function (displays) {
      console.log(displays)
    })
  })
})

module.exports = {
  startServer: function () {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
      // info.getDisplays(function (result) {
      //     info.getDisplays(function (displays) {
      //         console.log(displays)
      //     })
      // })
    })
  }
}

function executeXrandr (data) {
  exec('xrandr --output ' + data.name + ' --gamma ' + data.gamma.red + ':' +
    data.gamma.green + ':' + data.gamma.blue + ' --brightness ' + data.brightness, function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      console.log('ERR: ' + 'unable to set values for display ' + data.name)
    } else {
      console.log('OK: values set for display ' + data.name)
    }
  }
  )
}
