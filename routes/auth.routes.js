const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// main route
router.get('/', (req, res) => {
  res.send("hello")
})

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is wrong').isEmail(),
    check('password', 'minimal length of password should be 6').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'incorrect typed data'
      })
    }

    const { email, password } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: "account already exist" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: "account has been successfully created" })

  } catch (e) {
    res.status(500).json({ message: 'something went wrong, please try again' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'email is incorrect').normalizeEmail().isEmail(),
    check('password', 'enter the password').exists()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'incorrect typed data'
        })
      }

      const {email, password} = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "user is not found"})
      }
      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return res.status(400).json({ message: "incorrect password please try again"})
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'something went wrong, please try again' })
    }
})

module.exports = router