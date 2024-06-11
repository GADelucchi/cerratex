// Imports
const { Router } = require('express')
const MailRouter = require('./mail.router')
const cors = require('cors')


// Declaration
const router = Router()
const mailRouter = new MailRouter()

// Code
router.use(`/api/mail`, cors({origin: '*'}), mailRouter.getRouter())

// Export
module.exports = router