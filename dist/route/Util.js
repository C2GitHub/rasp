var  fs = require('fs')
var path = require('path')


module.exports = {
  dbPath: path.join(__dirname, './err.text'),
  getErrData: () => {
    return new Promise((resove, reject) => {
      fs.readFile('./route/err.text', 'utf8', (err, data) => {
        if(err) {
          reject(err)
        } else {
          data = data.toString()
          data === '' ? '[]' : data
          resove( JSON.parse(data))
        }
      })
    })
  },
  saveErrDate: (data) => {
    fs.writeFile('./route/err.text', JSON.stringify(data), (err) => {
      if(err) {
        throw err
      }
    })
  }
}