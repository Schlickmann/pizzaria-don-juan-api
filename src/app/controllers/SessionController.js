const { User } = require('../models')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({ error: 'User not found.' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Invalid password.' })
    }

    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
