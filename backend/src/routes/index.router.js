// Imports
const { Router } = require('express')
const MailRouter = require('./mail.router')

// Declaration
const router = Router()
const mailRouter = new MailRouter()

// Code
router.use(`/api/mail`, mailRouter.getRouter())

// Export
module.exports = router