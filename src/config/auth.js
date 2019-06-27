module.exports = {
  secret: process.env.JWT_ENCRYPTION || 'pizzaria2019',
  ttl: process.env.JWT_EXPIRATION || 86400
}
