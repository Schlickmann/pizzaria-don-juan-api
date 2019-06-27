const { ProductSize } = require('../models')
const path = require('path')
const fs = require('fs')

class ProductSizeController {
  async store (req, res) {
    try {
      const { filename } = req.file
      await ProductSize.create({ ...req.body, image: filename })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product size ${
          req.body.name
        } was not added.`
      })
    }
    return res
      .status(200)
      .json({ message: `Product size ${req.body.name} added successfully.` })
  }

  async update (req, res) {
    try {
      const product = await ProductSize.findOne({
        where: { id: req.params.product_size_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product size not found.' })
      }

      await ProductSize.update(
        { ...req.body },
        { returning: true, where: { id: req.params.product_size_id } }
      )

      return res
        .status(200)
        .json({ message: `Product size updated successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product size was not updated.`
      })
    }
  }

  async destroy (req, res) {
    try {
      const product = await ProductSize.findOne({
        where: { id: req.params.product_size_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product size not found.' })
      }

      await ProductSize.destroy({ where: { id: req.params.product_size_id } })
      fs.unlinkSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'temp',
          'assets',
          product.image
        )
      )

      return res
        .status(200)
        .json({ message: `Product size deleted successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product size was not deleted.`
      })
    }
  }

  async show (req, res) {
    try {
      const ProductSizes = await ProductSize.findAll({
        where: { product_type_id: req.params.product_type_id }
      })

      if (!ProductSizes) {
        return res
          .status(400)
          .json({ error: 'There is no product size to show.' })
      }

      return res.status(200).json({ ProductSizes })
    } catch (err) {
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }
}

module.exports = new ProductSizeController()
