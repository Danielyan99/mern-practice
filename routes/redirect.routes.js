const {Router} = require('express')
const Link = require('../models/Link')
const config = require("config");
const shortid = require("shortid");
const router = Router()

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code })

    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json('Link is not found')

  } catch (e) {
    res.status(500).json({ message: 'something went wrong, please try again' })
  }
})

module.exports = router