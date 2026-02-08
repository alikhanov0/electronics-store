const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10)
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashed
  })
  res.json({ message: 'User registered' })
}

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).json({ message: 'Invalid credentials' })

  const ok = await bcrypt.compare(req.body.password, user.password)
  if (!ok)
    return res.status(400).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  res.json({ token })
}
