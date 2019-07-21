const { promisify } = require('util')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

class Utils {
  async store (file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // pass your bucket name
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }

    let putObjectPromise = await s3.upload(params).promise()
    let location = putObjectPromise.Location

    return location
  }
}

module.exports = new Utils()
