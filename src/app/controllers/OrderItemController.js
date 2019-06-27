const { OrderItem } = require('../models')

class OrderItemController {
  async store (req, res) {
    try {
      const itemsArr = req.body.items.map(item => {
        return { ...item }
      })

      await OrderItem.bulkCreate(itemsArr)
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. Item could not be added.`
      })
    }
    return res.status(200).json({ message: `Items added successfully.` })
  }
  async show (req, res) {
    try {
      const items = await OrderItem.findAll({
        where: { order_id: req.params.order_id }
      })

      if (!items) {
        return res.status(400).json({ error: 'There is no items to show.' })
      }

      return res.status(200).json({ items })
    } catch (err) {
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }
}

module.exports = new OrderItemController()
