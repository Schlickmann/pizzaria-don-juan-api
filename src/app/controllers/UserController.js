const { User } = require('../models')

class UserController {
  async store (req, res) {
    try {
      await User.create({ ...req.body })
    } catch (err) {
      if (parseInt(err.original.code) === 23505) {
        return res.status(400).json({
          error: `The email ${req.body.email} is already in use.`
        })
      }
      return res.status(500).json({
        error: `Something went wrong. The user ${req.body.name} was not added.`
      })
    }

    return res
      .status(200)
      .json({ message: `User ${req.body.name} added successfully.` })
  }

  async show (req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({ error: 'User not found.' })
      }

      return res.status(200).json({ user })
    } catch (err) {
      return res.status(500).json({ error: `Something went wrong.` })
    }
  }

  async update (req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({ error: 'User not found.' })
      }

      await User.update(
        { ...req.body },
        { returning: true, where: { id: req.userId } }
      )

      return res.status(200).json({ message: `User updated successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The user was not updated.`
      })
    }
  }

  async destroy (req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({ error: 'User not found.' })
      }

      await User.destroy({ where: { id: req.userId } })

      return res.status(200).json({ message: `User deleted successfully.` })
    } catch (err) {
      return res.status(500).json({
        error: `Something went wrong. The user was not deleted.`
      })
    }
  }
}

module.exports = new UserController()
