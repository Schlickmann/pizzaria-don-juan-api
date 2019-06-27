const { ProductType } = require('../models')
const path = require('path')
const fs = require('fs')

class ProductTypeController {
  async store (req, res) {
    try {
      const { filename } = req.file
      await ProductType.create({ ...req.body, image: filename })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product type ${
          req.body.name
        } was not added.`
      })
    }
    return res
      .status(200)
      .json({ message: `Product type ${req.body.name} added successfully.` })
  }

  async update (req, res) {
    try {
      const product = await ProductType.findOne({
        where: { id: req.params.product_type_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product type not found.' })
      }

      await ProductType.update(
        { ...req.body },
        { returning: true, where: { id: req.params.product_type_id } }
      )

      return res
        .status(200)
        .json({ message: `Product type updated successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product type was not updated.`
      })
    }
  }

  async destroy (req, res) {
    try {
      const product = await ProductType.findOne({
        where: { id: req.params.product_type_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product type not found.' })
      }

      await ProductType.destroy({ where: { id: req.params.product_type_id } })
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
        .json({ message: `Product type deleted successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The product type was not deleted.`
      })
    }
  }

  async show (req, res) {
    try {
      const productTypes = await ProductType.findAll({
        where: { product_id: req.params.product_id }
      })

      if (!productTypes) {
        return res
          .status(400)
          .json({ error: 'There is no product type to show.' })
      }

      return res.status(200).json({ productTypes })
    } catch (err) {
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }
}

module.exports = new ProductTypeController()
