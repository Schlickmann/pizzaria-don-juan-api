const { ProductType } = require('../models')
const Utils = require('../../utils/uploadAWS')

class ProductTypeController {
  async store (req, res) {
    try {
      let location = ''
      if (req.file) {
        location = await Utils.store(req.file)
      }

      await ProductType.create({ ...req.body, image: location })
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
      let reqBody = {}
      const product = await ProductType.findOne({
        where: { id: req.params.product_type_id }
      })

      if (!product) {
        return res.status(400).json({ error: 'Product type not found.' })
      }

      if (req.file) {
        const location = await Utils.store(req.file)
        reqBody = { ...req.body, image: location }
      } else {
        reqBody = { ...req.body }
      }

      await ProductType.update(reqBody, {
        returning: true,
        where: { id: req.params.product_type_id }
      })

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
