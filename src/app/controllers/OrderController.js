const { Order, OrderItem, User } = require('../models')

class OrderController {
  async store (req, res) {
    try {
      await Order.create({ ...req.body, user_id: req.userId })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. Your order could not be placed.`
      })
    }
    return res.status(200).json({ message: `Order placed successfully.` })
  }

  async update (req, res) {
    try {
      const order = await Order.findOne({
        where: { id: req.params.order_id }
      })

      if (!order) {
        return res.status(400).json({ error: 'Order not found.' })
      }

      const user = await User.findOne({ where: { id: req.userId } })

      if (order.status === 'pending') {
        await Order.update(
          { ...req.body },
          { returning: true, where: { id: req.params.order_id } }
        )

        return res.status(200).json({ message: `Order canceled successfully.` })
      } else {
        if (user.user_type === 'admin') {
          await Order.update(
            { ...req.body },
            { returning: true, where: { id: req.params.order_id } }
          )

          return res
            .status(200)
            .json({ message: `Order updated successfully.` })
        }
        return res.status(400).json({
          error: 'Your order is already in progress. You cannot cancel it.'
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The Order was not updated.`
      })
    }
  }

  async show (req, res) {
    try {
      const orders = await Order.findAll({
        where: { user_id: req.userId },
        include: [{ model: OrderItem, as: 'order_items' }]
      })

      if (!orders) {
        return res.status(400).json({ error: 'There is no orders to show.' })
      }

      return res.status(200).json({ orders })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }
}

module.exports = new OrderController()
