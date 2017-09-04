const exec = require('child_process').exec

var displayNames = []
var info = {}

function Display () {
  this.brightness = 0
  this.gamma = {}
  this.resolution = {}
  this.name = 'unknown'
}

function getResolution (callback) {
  exec('xrandr --verbose | grep *current', function (err, stdout, stderr) {
    if (err) {
      console.log('error writing xrandr-output')
      callback({})
    } else {
      var lines = stdout.split('\n')
      for (var i = 0; i < displayNames.length; i++) {
        var splitArray = lines[i].split(' ').filter(function (data) {
          return data.length > 0
        })
        info[displayNames[i]].resolution.width = parseInt(splitArray[0].split('x')[0])
        info[displayNames[i]].resolution.height = parseInt(splitArray[0].split('x')[1])
      }

      callback(info)
    }
  })
}

function getGamma (callback) {
  exec('xrandr --verbose | grep Gamma', function (err, stdout, stderr) {
    if (err) {
      console.log('error writing xrandr-output')
      callback({})
    } else {
      var lines = stdout.split('\n').filter(function (data) {
        return data.length > 0
      })

      for (var i = 0; i < displayNames.length; i++) {
        info[displayNames[i]].gamma.red = parseFloat(lines[i].split(':')[1].trim())
        info[displayNames[i]].gamma.green = parseFloat(lines[i].split(':')[2].trim())
        info[displayNames[i]].gamma.blue = parseFloat(lines[i].split(':')[3].trim())
      }

      getBrightness(callback)
    }
  })
}

function getBrightness (callback) {
  exec('xrandr --verbose | grep Brightness', function (err, stdout, stderr) {
    if (err) {
      console.log('error writing xrandr-output')
      callback({})
    } else {
      var lines = stdout.split('\n').filter(function (data) {
        return data.length > 0
      })
      for (var i = 0; i < displayNames.length; i++) {
        info[displayNames[i]].brightness = parseFloat(lines[i].split(':')[1].trim())
      }

      getResolution(callback)
    }
  })
}

module.exports = {
  getDisplays: function (callback) {
    exec('xrandr --verbose | grep -w connected', function (err, stdout, stderr) {
      if (err) {
        console.log('error writing xrandr-output')
        callback({})
      } else {
        displayNames = []
        info = {}

        var lines = stdout.split('\n').filter(function (data) {
          return data.length > 0
        })
        for (let i = 0; i < lines.length; i++) {
          displayNames[i] = lines[i].split(' ')[0].trim()
        }

        for (let i = 0; i < displayNames.length; i++) {
          info[displayNames[i]] = new Display()
          info[displayNames[i]].name = displayNames[i]
        }

        getGamma(callback)
      }
    })
  }
}
