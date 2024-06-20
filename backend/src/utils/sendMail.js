// Imports
const nodemailer = require('nodemailer')
const { mailUser, mailPass, smtp_port, server } = require('../../process/config.js')
const { logger } = require('../config/logger.js')

// Config
const transport = nodemailer.createTransport({
    host: server,
    port: smtp_port,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPass
    }
})

// Verify connection
transport.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Exports
exports.sendMail = async (email, subject, html) => {
    try {
        return await transport.sendMail({
            from: `Pedidos <${mailUser}>`,
            to: email,
            subject: subject,
            html: html
        })
    } catch (error) {
        logger.error('Error al enviar el correo:', error)
        throw error
    }
}