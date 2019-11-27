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
  },
  getData: (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
          reject(err)
        }else {
          resolve(data)
        }
      })
    })
    // var data = await new Promise((resolve, reject) => {
    //   return  fs.readFileSync(path, 'utf8')
    // })
  },
  saveData (path, data){
   return new Promise((resolve, reject) => {
     fs.writeFile(path, data, (err) => {
       if (err) {
         reject(err)
       }
       resolve(true)
     })
   })
  }
}