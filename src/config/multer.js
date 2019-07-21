// const path = require('path')
// const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  storage: multer.memoryStorage()
  // multer.diskStorage({
  //   destination: path.resolve(__dirname, '..', '..', 'temp', 'assets'),
  //   filename: (req, file, cb) => {
  //     crypto.randomBytes(16, (err, raw) => {
  //       if (err) return cb(err)

  //       cb(null, raw.toString('hex') + path.extname(file.originalname))
  //     })
  //   }
  // })
}
