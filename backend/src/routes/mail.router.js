// Imports
const { mailReceiver } = require('../../process/config')
const { sendMail } = require('../utils/sendMail')
const { RouterClass } = require('./routerClass')

// Code
class MailRouter extends RouterClass {
  init() {
    this.post('/', async (req, res) => {
      try {
        console.log(req.body);
        const { name, lastName, phoneNumber, email, products } = req.body

        let mailContent = `
              <h2>Cliente:</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Apellido:</strong> ${lastName}</p>
                <p><strong>Teléfono:</strong> ${phoneNumber}</p>
                <p><strong>Correo:</strong> ${email}</p>

                <h2>Productos:</h2>
                <ul>`

        products.forEach(product => {
          mailContent += `<li><strong>Artículo:</strong> ${product.id} - <strong>Nombre:</strong> ${product.name} - <strong>Cantidad:</strong> ${product.quantity}</li>`;
        });

        mailContent += '</ul>'

        await sendMail(mailReceiver, 'Nuevo pedido realizado', mailContent)

        res.staus(204).send('Correo enviado')
      } catch (error) {
        res.sendServerError(error)
        throw new Error(error)
      }
    })
  }
}

// Export
module.exports = MailRouter