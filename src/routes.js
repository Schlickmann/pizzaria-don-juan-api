const express = require('express')
const path = require('path')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middleware/auth')

const controllers = require('./app/controllers')

routes.post('/signup', controllers.UserController.store)

routes.post('/signin', controllers.SessionController.store)

routes.get('/images/:image', (req, res, next) => {
  const img = path.resolve('..', '..', 'temp', 'assets', req.params.image)

  try {
    res.sendFile(img)
  } catch (err) {
    next(err)
  }
})

routes.use(authMiddleware)
/**
 * User routes
 */
routes.get('/user', controllers.UserController.show)
routes.put('/user', controllers.UserController.update)
routes.delete('/user', controllers.UserController.destroy)

/**
 * Product routes
 */
routes.get('/products', controllers.ProductController.show)
routes.post(
  '/products',
  upload.single('image'),
  controllers.ProductController.store
)
routes.put(
  '/products/:product_id',
  upload.single('image'),
  controllers.ProductController.update
)
routes.delete('/products/:product_id', controllers.ProductController.destroy)

/**
 * Product Type routes
 */
routes.get('/product_types/:product_id', controllers.ProductTypeController.show)
routes.post(
  '/product_types',
  upload.single('image'),
  controllers.ProductTypeController.store
)
routes.put(
  '/product_types/:product_type_id',
  upload.single('image'),
  controllers.ProductTypeController.update
)
routes.delete(
  '/product_types/:product_type_id',
  controllers.ProductTypeController.destroy
)

/**
 * Product Size routes
 */
routes.get(
  '/product_sizes/:product_type_id',
  controllers.ProductSizeController.show
)
routes.post(
  '/product_sizes',
  upload.single('image'),
  controllers.ProductSizeController.store
)
routes.put(
  '/product_sizes/:product_size_id',
  upload.single('image'),
  controllers.ProductSizeController.update
)
routes.delete(
  '/product_sizes/:product_size_id',
  controllers.ProductSizeController.destroy
)

/**
 * Order routes
 */
routes.get('/orders', controllers.OrderController.show)
routes.post('/orders', controllers.OrderController.store)
routes.put('/orders/:order_id', controllers.OrderController.update)

/**
 * Order Item routes
 */
routes.get('/order_items/:order_id', controllers.OrderItemController.show)
routes.post('/order_items', controllers.OrderItemController.store)

module.exports = routes
