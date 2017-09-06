const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const exec = require('child_process').exec
const info = require('./xrandr-extract.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('gamma-save.json')
const db = low(adapter)
db.defaults({displays: {}})

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
  var data = req.body

  db.set(`displays[${data.name}]`, data).write()
  executeXrandr(data)
  res.status(201).send('Saved successfully.')
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
