const { Product } = require('../models')
const path = require('path')
const fs = require('fs')

class ProductController {
  async store (req, res) {
    try {
      const { filename } = req.file
      await Product.create({ ...req.body, image: filename })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product ${
          req.body.name
        } was not added.`
      })
    }
    return res
      .status(200)
      .json({ message: `Product ${req.body.name} added successfully.` })
  }

  async update (req, res) {
    try {
      let reqBody = {}
      const product = await Product.findOne({
        where: { id: req.params.product_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product not found.' })
      }

      if (req.file) {
        const { filename } = req.file
        reqBody = { ...req.body, image: filename }
      } else {
        reqBody = { ...req.body }
      }

      await Product.update(
        reqBody,
        { returning: true, where: { id: req.params.product_id } }
      )

      return res.status(200).json({ message: `Product updated successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product was not updated.`
      })
    }
  }

  async destroy (req, res) {
    try {
      const product = await Product.findOne({
        where: { id: req.params.product_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product not found.' })
      }

      await Product.destroy({ where: { id: req.params.product_id } })
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

      return res.status(200).json({ message: `Product deleted successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product was not deleted.`
      })
    }
  }

  async show (req, res) {
    try {
      const products = await Product.findAll()

      if (!products) {
        return res.status(400).json({ error: 'There is no product to show.' })
      }

      return res.status(200).json({ products })
    } catch (err) {
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }
}

module.exports = new ProductController()
